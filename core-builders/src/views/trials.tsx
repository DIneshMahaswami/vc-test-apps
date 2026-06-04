import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Assignment } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, required, useUnique} from "react-admin";

export const RESOURCE = "trials"
export const ICON = Assignment
export const PREFETCH: string[] = []

export const TrialsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const TrialsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const trialsActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />
]

export const TrialsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="name" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const TrialsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="name" variant='h6' />}>
            </CardGrid>
        </List>
    )
}

const TrialForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="name" validate={[required(), unique()]} />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const TrialEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <TrialForm />
        </Edit>
    )
}

const TrialCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <TrialForm />
        </Create>
    )
}

const TrialShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const trialsFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    notes: { ui: 'multiline' }
};
const trialsSearchableFields: string[] = [
    'name'
];

export const TrialsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ trialsFieldSchema}
        actionDefs={ trialsActionDefs}
        searchableFields={ trialsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<TrialsList/>}
        create={<TrialCreate/>}
        edit={<TrialEdit/>}
        show={<TrialShow/>}
        hasDialog
        hasLiveUpdate
        cardList={<TrialsCardList/>}
        sort={{ field: 'name', order: 'ASC' }}
    />
)
export const TrialsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Trials" leftIcon={<ICON />} />
)
