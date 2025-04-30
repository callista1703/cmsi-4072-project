import { Controller, Control, FieldErrors } from "react-hook-form";
import { useState } from "react";
import { FormFields, onboardingSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";

const roles = [
	{ value: "Student", label: "Student" },
	{ value: "Teacher", label: "Teacher" },
];

export interface OnboardingRoleFormProps {
	control: Control<FormFields>;
	errors: FieldErrors<FormFields>;
}

export const OnboardingRoleForm = ({
	control,
	errors,
}: OnboardingRoleFormProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm" htmlFor="role">
				Role
			</label>
			<Controller
				control={control}
				name="role"
				render={({ field }) => (
					<div>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									className="w-[200px] justify-between"
								>
									{roles.find((r) => r.value === field.value)?.label ||
										"Select role"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-[200px] p-0">
								<Command>
									<CommandList>
										<CommandEmpty>No role found.</CommandEmpty>
										<CommandGroup>
											{roles.map((role) => (
												<CommandItem
													key={role.value}
													value={role.value}
													onSelect={(value) => {
														field.onChange(value);
														setOpen(false);
													}}
												>
													{role.label}
													{field.value === role.value && (
														<Check className="ml-auto" />
													)}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						{errors.role && (
							<div className="text-red-600 text-sm">{errors.role.message}</div>
						)}
					</div>
				)}
			/>
		</div>
	);
};
