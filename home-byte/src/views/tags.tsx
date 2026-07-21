import {
    Resource, createDefaults, tableDefaults,
    editDefaults, formDefaults, listDefaults,
    showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
    type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, TextLiveFilter,
    SelectField,
    SelectInput
} from '@mahaswami/vc-frontend';
import { Label } from '@mui/icons-material';
import {
    Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, required, useUnique
} from "react-admin";
import { ColorField } from '../components/ColorField';
import { ColorInput } from '../components/ColorInput';
import { TagField } from '../components/TagField';

export const RESOURCE = "tags";
export const ICON = Label;
export const PREFETCH: string[] = [];

export const TagsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const TagsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const tagsActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />
]

export const contextChoices = [{ id: 'leads_tags', name: 'Leads Tags' }, { id: 'units_tags', name: 'Units Tags' }]
export const ContextChoiceField = (props: any) => <SelectField {...props} choices={contextChoices} />;

export const TagsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="name" field={TagField} />
                <DataTable.Col source="context" field={ContextChoiceField} />
                <DataTable.Col source="color" field={ColorField} />
                <RowActions />
            </DataTable>
        </List>
    )
}

export const TagsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TagField source="name" />}>
                <ContextChoiceField source="context" />
                <ColorField source="color" />
            </CardGrid>
        </List>
    )
}

const TagForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="name" validate={[required(), unique()]} />
            <SelectInput source="context" choices={contextChoices} validate={required()} />
            <ColorInput source="color" previewLabel="resources.tags.tag_preview" showPreview watchField='name' />
            <TextInput source="description" multiline rows={3} />
        </SimpleForm>
    )
}

const TagEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <TagForm />
        </Edit>
    )
}

const TagCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <TagForm />
        </Create>
    )
}

const TagShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TagField source="name" />
                <ContextChoiceField source="context" />
                <ColorField source="color" />
                <TextField source="description" />
            </SimpleShowLayout>
        </Show>
    )
}

const tagsFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    context: { required: true, ui: 'select', choices: contextChoices },
    color: {},
    description: { ui: 'multiline' }
};
const tagsSearchableFields: string[] = [
    'name',
    'context',
    'color',
    'description'
];

export const TagsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={tagsFieldSchema}
        actionDefs={tagsActionDefs}
        searchableFields={tagsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<TagsList />}
        create={<TagCreate />}
        edit={<TagEdit />}
        show={<TagShow />}
        hasLiveUpdate
        cardList={<TagsCardList />}
        sort={{ field: 'name', order: 'ASC' }}
        hasBulkDelete
    />
)
export const TagsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Tags" leftIcon={<ICON />} />
)
