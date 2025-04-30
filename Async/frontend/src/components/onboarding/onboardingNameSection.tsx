import { z } from "zod";
import { onboardingSchema, FormFields } from "./schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const onboardingNameSchema = onboardingSchema.pick({
	firstName: true,
	lastName: true,
});

type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;

interface OnboardingNameFormProps {
	register: UseFormRegister<FormFields>;
	errors: FieldErrors<OnboardingNameSchema>;
}
export const OnboardingNameForm = ({
	register,
	errors,
}: OnboardingNameFormProps) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="firstName">
					First Name
				</label>
				<input
					{...register("firstName")}
					type="text"
					id="firstName "
					className=" border rounded-sm border-stone-200 p-2"
				/>
			</div>
			{errors.firstName && (
				<div className="text-red-600 text-sm">{errors.firstName.message}</div>
			)}
			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="lastName">
					Last Name
				</label>
				<input
					{...register("lastName")}
					type="text"
					id="last_name"
					className=" border rounded-sm border-stone-200 p-2"
				/>
			</div>
			{errors.lastName && (
				<div className="text-red-600 text-sm">{errors.lastName.message}</div>
			)}
		</div>
	);
};
