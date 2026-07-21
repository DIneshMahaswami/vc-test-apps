import { closeDialog, openDialog, PER_PAGE_UNLIMITED, SimpleForm } from "@mahaswami/vc-frontend";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AutocompleteRenderGetTagProps, Box, IconButton } from "@mui/material";
import {
    type ComponentsOverrides,
    styled,
    useThemeProps
} from "@mui/material/styles";
import { useCallback, useMemo, useState } from "react";
import {
    AutocompleteArrayInput,
    CreateBase,
    EditBase,
    RecordContextProvider,
    ReferenceArrayInput,
    ReferenceArrayInputBaseProps,
    required,
    SaveButton,
    TextInput,
    Toolbar,
    useResourceContext,
    useTranslate,
    useUnique
} from "react-admin";
import { ColorInput } from "./ColorInput";
import { TagField } from "./TagField";

const PREFIX = "RaTagsInput";

export interface TagsArrayInputProps extends Omit<ReferenceArrayInputBaseProps, "reference"> {
    className?: string;
    context?: string;
    allowEdit?: boolean;
    allowCreate?: boolean;
    showColor?: boolean;
    showDescription?: boolean;
}

type TagOption = {
    id: number;
    name?: string;
    color?: string;
    description?: string;
};

export const TagsInput = (inProps: TagsArrayInputProps) => {
    const props = useThemeProps({
        props: inProps,
        name: PREFIX,
    });

    const resource = useResourceContext(props);
    let tagContext = props?.context;
    let options = { allowCreate: false, allowEdit: false, showColor: true, showDescription: true }

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
        className,
        context = tagContext,
        allowEdit = options.allowEdit,
        allowCreate = options.allowCreate,
        showColor = options.showColor,
        showDescription = options.showDescription,
        ...rest
    } = props;

    if (context === null || context === undefined || context?.trim() === "") {
        throw new Error("Tag context is required");
    }

    const [key, setKey] = useState(0);
    const translate = useTranslate();
    const filter = useMemo(() => ({ context }), [context]);

    const editDialogTitle = translate("resources.tags.edit_dialog_title", { _: "Edit Tag" });
    const createDialogTitle = translate("resources.tags.create_dialog_title", { _: "Create Tag", });

    const handleTagCreate = async (newValue?: string) => {
        openDialog(<CreateTagDialog newValue={newValue} />, {
            Title: createDialogTitle,
        });
    };

    const FormToolbar = () => (
        <Toolbar>
            <SaveButton />
        </Toolbar>
    );

    const onSuccess = () => {
        setKey((k) => k + 1);
        closeDialog();
    };

    const EditTagDialog = ({ id }: { id: number }) => {
        return (
            <EditBase
                actions={false}
                id={id}
                resource="tags"
                redirect={false}
                mutationMode="pessimistic"
                mutationOptions={{ onSuccess }}
            >
                <TagForm />
            </EditBase>
        );
    };

    const TagForm = (props: { defaultValues?: Record<string, unknown> }) => {
        const unique = useUnique();
        const tagPreview = translate("resources.tags.tag_preview", { _: "Tag Preview" });
        return (
            <SimpleForm toolbar={<FormToolbar />} defaultValues={props.defaultValues}>
                <TextInput source="name" autoFocus validate={[required(), unique()]} />
                {showDescription && <TextInput source="description" multiline rows={3} />}
                {showColor && (
                    <ColorInput showPreview watchField="name" previewLabel={tagPreview} />
                )}
            </SimpleForm>
        );
    };

    const CreateTagDialog = ({ newValue }: { newValue?: string }) => {
        return (
            <CreateBase
                resource="tags"
                redirect={false}
                mutationOptions={{ onSuccess }}
            >
                <TagForm defaultValues={{ context, name: newValue }} />
            </CreateBase>
        );
    };

    const renderTags = useCallback(
        (value: readonly TagOption[], getTagProps: AutocompleteRenderGetTagProps) =>
            value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                    <RecordContextProvider key={key} value={option}>
                        <TagField
                            {...tagProps}
                            source="name"
                            clickable={allowEdit}
                            showColor={showColor}
                            showDescription={showDescription}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            onClick={(e) => {
                                if (allowEdit) {
                                    e.stopPropagation();
                                    openDialog(<EditTagDialog id={option.id} />, {
                                        Title: editDialogTitle,
                                    });
                                }
                            }}
                        />
                    </RecordContextProvider>
                );
            }),
        [allowEdit, editDialogTitle, showColor, showDescription]
    );

    return (
        <ReferenceArrayInput page={1} perPage={PER_PAGE_UNLIMITED} filter={filter} {...rest} reference="tags">
            <StyledTagsInput className={className}>
                <AutocompleteArrayInput
                    className="RaTagsInput-input"
                    helperText={false}
                    label={props?.label}
                    optionText={record => <TagField
                        record={record}
                        showColor={showColor}
                        showDescription={showDescription}
                        source="name"
                    />}
                    key={key}
                    multiple={true}
                    renderTags={renderTags}
                />
                {allowCreate && (
                    <IconButton
                        className="RaTagsInput-createButton"
                        color="primary"
                        onClick={() => handleTagCreate()}
                    >
                        <AddBoxIcon />
                    </IconButton>
                )}
            </StyledTagsInput>
        </ReferenceArrayInput>
    );
};

const StyledTagsInput = styled(Box, {
    name: PREFIX,
    overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1),
    justifyContent: "center",
    width: "100%",

    "& .RaTagsInput-input": {
        flex: "1 1 auto",
        minWidth: 0,
    },

    "& .RaTagsInput-createButton": {
        backgroundColor: "transparent",
        border: 0,
        flex: "0 0 auto",
    },
}));

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        [PREFIX]: "root";
    }

    interface ComponentsPropsList {
        [PREFIX]: Partial<TagsArrayInputProps>;
    }

    interface Components {
        [PREFIX]?: {
            defaultProps?: ComponentsPropsList[typeof PREFIX];
            styleOverrides?: ComponentsOverrides<
                Omit<Theme, "components">
            >[typeof PREFIX];
        };
    }
}
