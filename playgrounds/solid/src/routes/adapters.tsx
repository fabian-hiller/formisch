import { valibotForm, zodForm } from "@formisch/adapters";
import { Field, Form, createForm } from "@formisch/solid";
import * as v from "valibot";
import { z } from "zod";

// Valibot schema
const ValibotLoginSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(8)),
});

// Zod schema
const ZodLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function AdaptersPage() {
	// Form with Valibot
	const valibotFormInstance = createForm({
		schema: valibotForm(ValibotLoginSchema),
	});

	// Form with Zod
	const zodFormInstance = createForm({
		schema: zodForm(ZodLoginSchema),
	});

	return (
		<div class="space-y-8">
			<div>
				<h2 class="text-2xl font-bold mb-4">Valibot Form</h2>
				<Form
					of={valibotFormInstance}
					onSubmit={(output) => console.log("Valibot:", output)}
				>
					<Field of={valibotFormInstance} path={["email"]}>
						{(field) => (
							<div class="mb-4">
								<label class="block text-sm font-medium mb-1">Email</label>
								<input
									{...field.props}
									value={field.input}
									type="email"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{field.errors && (
									<div class="text-red-500 text-sm mt-1">{field.errors[0]}</div>
								)}
							</div>
						)}
					</Field>
					<Field of={valibotFormInstance} path={["password"]}>
						{(field) => (
							<div class="mb-4">
								<label class="block text-sm font-medium mb-1">Password</label>
								<input
									{...field.props}
									value={field.input}
									type="password"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{field.errors && (
									<div class="text-red-500 text-sm mt-1">{field.errors[0]}</div>
								)}
							</div>
						)}
					</Field>
					<button
						type="submit"
						class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Submit (Valibot)
					</button>
				</Form>
			</div>

			<div>
				<h2 class="text-2xl font-bold mb-4">Zod Form</h2>
				<Form
					of={zodFormInstance}
					onSubmit={(output) => console.log("Zod:", output)}
				>
					<Field of={zodFormInstance} path={["email"]}>
						{(field) => (
							<div class="mb-4">
								<label class="block text-sm font-medium mb-1">Email</label>
								<input
									{...field.props}
									value={field.input}
									type="email"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								/>
								{field.errors && (
									<div class="text-red-500 text-sm mt-1">{field.errors[0]}</div>
								)}
							</div>
						)}
					</Field>
					<Field of={zodFormInstance} path={["password"]}>
						{(field) => (
							<div class="mb-4">
								<label class="block text-sm font-medium mb-1">Password</label>
								<input
									{...field.props}
									value={field.input}
									type="password"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								/>
								{field.errors && (
									<div class="text-red-500 text-sm mt-1">{field.errors[0]}</div>
								)}
							</div>
						)}
					</Field>
					<button
						type="submit"
						class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						Submit (Zod)
					</button>
				</Form>
			</div>
		</div>
	);
}
