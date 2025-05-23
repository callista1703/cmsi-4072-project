import { z } from "zod";

export const onboardingSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	role: z.string({
		required_error: "Please select a role",
	}),
});

export type FormFields = z.infer<typeof onboardingSchema>;
