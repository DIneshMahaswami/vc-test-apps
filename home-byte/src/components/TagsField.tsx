import {
    ReferenceArrayField,
    type ReferenceArrayFieldProps,
    SingleFieldList,
    useResourceContext,
} from "react-admin";
import { TagField, type TagFieldProps } from "./TagField";
import { PER_PAGE_UNLIMITED } from "@mahaswami/vc-frontend";

interface TagsArrayFieldProps extends Omit<ReferenceArrayFieldProps, "reference"> {
    context?: string;
    showColor?: TagFieldProps["showColor"];
    showDescription?: TagFieldProps["showDescription"];
}

export const TagsField = (props: TagsArrayFieldProps) => {

    const resource = useResourceContext(props);
    let tagContext = props?.context;
    let options = {showColor: true, showDescription: true }

    if (!tagContext) {
        const fieldSchema = window.swanAppFunctions.resourceDefinitions?.[resource as string]?.fieldSchema ?? {};
        for (const field in fieldSchema) {
            if (fieldSchema[field]?.ui === "tags" && fieldSchema[field]?.context) {
                tagContext = fieldSchema[field]?.context;
            }
            if (fieldSchema[field]?.ui === "tags" && fieldSchema[field]?.options) {
                options = { ...options, ...fieldSchema[field]?.options ?? {} }
            }
        }
    }

    const {
        context = tagContext,
        showColor = options.showColor,
        showDescription = options.showDescription,
        ...rest
    } = props;


    return (
        <ReferenceArrayField perPage={PER_PAGE_UNLIMITED} reference="tags" filter={{ context }} {...rest} >
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
