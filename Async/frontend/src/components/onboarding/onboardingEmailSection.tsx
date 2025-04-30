import { z } from "zod";
import { onboardingSchema, FormFields } from "./schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const onboardingEmailSchema = onboardingSchema.pick({
	email: true,
	password: true,
});

type OnboardingEmailSchema = z.infer<typeof onboardingEmailSchema>;

interface OnboardingEmailFormProps {
	register: UseFormRegister<FormFields>;
	errors: FieldErrors<OnboardingEmailSchema>;
}
export const OnboardingEmailForm = ({
	register,
	errors,
}: OnboardingEmailFormProps) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="email">
					Email
				</label>
				<input
					{...register("email")}
					id="email"
					className=" border rounded-sm border-stone-200 p-2"
				/>
			</div>
			{errors.email && (
				<div className="text-red-600 text-sm">{errors.email.message}</div>
			)}

			{/* Password Input */}
			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="password">
					Password
				</label>
				<input
					{...register("password")}
					type="password"
					id="password"
					className=" border rounded-sm border-stone-200 p-2"
				/>
			</div>
			{errors.password && (
				<div className="text-red-600 text-sm">{errors.password.message}</div>
			)}
		</div>
	);
};
