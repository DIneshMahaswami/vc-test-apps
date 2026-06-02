import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, ChoicesLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Handyman } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, SelectField, SelectInput, required, useUnique} from "react-admin";

export const RESOURCE = "contractors"
export const ICON = Handyman
export const PREFETCH: string[] = []

export const ContractorsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const ContractorsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const contractorsActionDefs: ResourceActionDefs = {};

export const contractorTypeChoices = [{ id: 'plumbing', name: 'Plumbing' }, { id: 'electrical', name: 'Electrical' }, { id: 'cleaning', name: 'Cleaning' }, { id: 'security', name: 'Security' }, { id: 'hvac', name: 'HVAC' }, { id: 'general_maintenance', name: 'General Maintenance' }];
export const ContractorTypeChoiceField = (props: any) => <SelectField {...props} choices={contractorTypeChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ChoicesLiveFilter source="contractor_type" label="Contractor Type" choiceLabels={contractorTypeChoices} show />
]

export const ContractorsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="name" />
                <DataTable.Col source="contractor_type" field={ContractorTypeChoiceField} />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const ContractorsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="name" variant='h6' />}>
                <SelectField source="contractor_type" choices={contractorTypeChoices} />
            </CardGrid>
        </List>
    )
}

const ContractorForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="name" validate={[required(), unique()]} />
            <SelectInput source="contractor_type" choices={contractorTypeChoices} validate={required()} />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const ContractorEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <ContractorForm />
        </Edit>
    )
}

const ContractorCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <ContractorForm />
        </Create>
    )
}

const ContractorShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="name" />
                <SelectField source="contractor_type" choices={contractorTypeChoices} />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const contractorsFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    contractor_type: { ui: 'select', required: true, choices: contractorTypeChoices },
    notes: { ui: 'multiline' }
};
const contractorsSearchableFields: string[] = [
    'name',
    'contractor_type'
];

export const ContractorsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ contractorsFieldSchema}
        actionDefs={ contractorsActionDefs}
        searchableFields={ contractorsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<ContractorsList/>}
        create={<ContractorCreate/>}
        edit={<ContractorEdit/>}
        show={<ContractorShow/>}
        hasDialog
        hasLiveUpdate
        cardList={<ContractorsCardList/>}
        sort={{ field: 'name', order: 'ASC' }}
    />
)
export const ContractorsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Contractors" leftIcon={<ICON />} />
)
