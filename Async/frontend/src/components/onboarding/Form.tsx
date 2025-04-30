import { useForm, SubmitHandler } from "react-hook-form";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { FormFields, onboardingSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { OnboardingNameForm } from "./onboardingNameSection";
import { OnboardingEmailForm } from "./onboardingEmailSection";
import { OnboardingRoleForm } from "./onboardingRoleSection";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

const steps = [
	{ id: "step 1", name: "Name", fields: ["firstName", "lastName"] },
	{ id: "step 2", name: "Email & Password", fields: ["email", "password"] },
	{ id: "step 3", name: "Role", fields: ["role"] },
];

export const Form = () => {
	const { session, signUpNewUser } = useAuth();
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const stepDifference = currentStep - previousStep;

	const navigate = useNavigate({ from: "/register" });

	const {
		register,
		handleSubmit,
		trigger,
		reset,
		formState: { errors, isSubmitting },
		setError,
		control,
	} = useForm<FormFields>({
		resolver: zodResolver(onboardingSchema),
	});

	type FieldName = keyof FormFields;

	const nextStep = async () => {
		const fields = steps[currentStep].fields;
		const output = await trigger(fields as FieldName[], { shouldFocus: true });

		if (!output) return;

		setPreviousStep(currentStep);
		// delay changing step to next tick to prevent click-through triggering submit
		requestAnimationFrame(() => {
			setCurrentStep((prev) => prev + 1);
		});
	};
	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const SubmitFn: SubmitHandler<FormFields> = async (data) => {
		try {
			console.log(data);
			const result = await signUpNewUser(
				data.email,
				data.password,
				data.firstName,
				data.lastName,
				data.role
			);

			if (result.success) {
				console.log("User signed up successfully:", result.data);
				navigate({ to: "/calendar" });
			}
			reset();
		} catch (error) {
			setError("root", {
				message: "An error occurred while submitting the form",
			});
		}
	};

	console.log(currentStep);
	console.log(stepDifference);

	return (
		<form onSubmit={handleSubmit(SubmitFn)} className="space-y-4">
			<CardContent>
				{currentStep === 0 && (
					<motion.div
						initial={{ x: stepDifference > 0 ? "-50%" : "0%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<OnboardingNameForm register={register} errors={errors} />
					</motion.div>
				)}
				{currentStep === 1 && (
					<motion.div
						initial={{ x: stepDifference >= 0 ? "50%" : "-50%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<OnboardingEmailForm register={register} errors={errors} />
					</motion.div>
				)}
				{currentStep === 2 && (
					<motion.div
						initial={{ x: stepDifference >= 0 ? "50%" : "-50%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<OnboardingRoleForm control={control} errors={errors} />
					</motion.div>
				)}
			</CardContent>
			<CardFooter className="flex flex-col gap-6">
				<div className="flex gap-4 justify-between w-full">
					{/* Back button - only show when not on first step */}
					{currentStep > 0 && (
						<Button
							onClick={prevStep}
							className="cursor-pointer"
							variant="default"
							type="button"
						>
							Back
						</Button>
					)}

					{/* Next button - show on all steps except last */}
					{currentStep < steps.length - 1 ? (
						<Button
							onClick={nextStep}
							className={`cursor-pointer ${currentStep === 0 ? "w-full" : ""}`}
							variant="default"
							type="button"
						>
							Next
						</Button>
					) : (
						/* Submit button - only show on last step */
						<Button
							type="submit"
							disabled={isSubmitting}
							className="cursor-pointer"
							variant="default"
						>
							{isSubmitting && <Loader2 className="animate-spin mr-1" />}
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					)}
				</div>

				{errors.root && (
					<div className="text-red-600 text-sm">{errors.root.message}</div>
				)}
				<div className="flex items-center w-full">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="mx-4 text-gray-500 text-xs">or</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<div>
					<Button variant="outline" className="cursor-pointer">
						<Globe />
						Register with Google
					</Button>
				</div>
			</CardFooter>
		</form>
	);
};
