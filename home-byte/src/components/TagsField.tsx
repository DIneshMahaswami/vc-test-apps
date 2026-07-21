import {
    ReferenceArrayField,
    type ReferenceArrayFieldProps,
    SingleFieldList,
    useResourceContext,
} from "react-admin";
import { TagField, type TagFieldProps } from "./TagField";

interface TagsArrayFieldProps extends Omit<ReferenceArrayFieldProps, "reference"> {
    context?: string;
    showColor?: TagFieldProps["showColor"];
    showDescription?: TagFieldProps["showDescription"];
}

export const TagsField = (props: TagsArrayFieldProps) => {

    const resource = useResourceContext(props);
    let tagContext = props?.context;
    let options = { showColor: true, showDescription: true }

    if (!tagContext) {
        const fieldSchema = window.swanAppFunctions.resourceDefinitions?.[resource as string]?.fieldSchema ?? {};
        const fieldConfig = fieldSchema[props?.source]
        if (fieldConfig?.ui === "tags" && fieldConfig?.context) {
            tagContext = fieldConfig?.context;
        }
        if (fieldConfig?.ui === "tags" && fieldConfig?.options) {
            options = { ...options, ...fieldConfig?.options ?? {} }
        }
    }

    const {
        context = tagContext,
        showColor = options.showColor,
        showDescription = options.showDescription,
        ...rest
    } = props;


    return (
        <ReferenceArrayField pagination={false} reference="tags" filter={{ context }} {...rest} >
            <SingleFieldList linkType={false}>
                <TagField
                    source="name"
                    showColor={showColor}
                    showDescription={showDescription}
                />
            </SingleFieldList>
        </ReferenceArrayField>
    )
}
