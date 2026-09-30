import { useEffect } from "react";
import { useActionData, useSubmit } from "react-router";
import { toast } from "sonner";
import { FormTrigger } from "~/components/forms/form-submission-trigger";
import {
    FieldTypeEnum,
    type FieldConfig,
} from "~/lib/various/form-retrieving/types";
import { triggerLoginAction } from "~/lib/various/form-submission/login/action-triggers";
import type { action } from "~/routes/login";

const formFields: FieldConfig[] = [
    {
        name: "dn",
        label: "Enter you Distinguished Name",
        type: FieldTypeEnum.enum.text,
        order: 2,
    },
    {
        name: "password",
        label: "Enter you password",
        type: FieldTypeEnum.enum.pass,
        order: 3,
    },
];

export function MainViewLogin() {
    const actionData = useActionData<typeof action>();

    useEffect(() => {
        if (actionData?.success) {
            toast.success("Iniciaste sesión con éxito");
        }
    }, [actionData?.success]);

    function createBookWrapper(data: any) {
        const createBookCommand = {
            dn: data.dn,
            password: data.password,
        };

        triggerLoginAction(createBookCommand, submit);
    }

    const submit = useSubmit();

    return (
        <div className="grid w-full place-items-center pt-8">
            <div className="w-1/2 rounded border">
                <h2 className="text-xl font-medium">
                    Ingresa tus credenciales
                </h2>
                <FormTrigger
                    formId="create-book"
                    containerClassName="border border-gray-100"
                    className="py-6 px-4"
                    fieldArray={formFields}
                    onSubmit={createBookWrapper}
                    disabled={false}
                />
            </div>
        </div>
    );
}
