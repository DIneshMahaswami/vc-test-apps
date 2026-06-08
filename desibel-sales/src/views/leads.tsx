import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, CardGrid, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { ContactMail } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, required} from "react-admin";
import { EmployeesReferenceField, EmployeesReferenceInput } from './employees.js';

export const RESOURCE = "leads"
export const ICON = ContactMail
export const PREFETCH: string[] = ["assigned_employee:employees"]

export const LeadsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const LeadsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const leadsActionDefs: ResourceActionDefs = {};

export const statusChoices = [{ id: 'new', name: 'New' }, { id: 'contacted', name: 'Contacted' }, { id: 'qualified', name: 'Qualified' }, { id: 'proposal_sent', name: 'Proposal Sent' }, { id: 'negotiation', name: 'Negotiation' }, { id: 'won', name: 'Won' }, { id: 'lost', name: 'Lost' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="assigned_employee_id" reference="employees" label="Assigned Employee" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />
]

export const LeadsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['assigned_employee_id', 'status', 'expected_value']} >
                <DataTable.Col source="customer_name" />
                <DataTable.Col source="company_name" />
                <DataTable.Col source="phone" />
                <DataTable.Col source="email" />
                <DataTable.Col source="lead_source" />
                <DataTable.Col source="assigned_employee_id" field={EmployeesReferenceField}/>
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="expected_value" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const LeadsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="customer_name" variant='h6' />}>
                <TextField source="company_name" />
                <TextField source="phone" />
            </CardGrid>
        </List>
    )
}

const LeadForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <TextInput source="customer_name" validate={required()} />
            <TextInput source="company_name" />
            <TextInput source="phone" />
            <TextInput source="email" />
            <TextInput source="lead_source" />
            <EmployeesReferenceInput source="assigned_employee_id" />
            <SelectInput source="status" choices={statusChoices} validate={required()} />
            <TextInput source="expected_value" />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const LeadEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <LeadForm />
        </Edit>
    )
}

const LeadCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <LeadForm />
        </Create>
    )
}

const LeadShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="customer_name" />
                <TextField source="company_name" />
                <TextField source="phone" />
                <TextField source="email" />
                <TextField source="lead_source" />
                <EmployeesReferenceField source="assigned_employee_id" />
                <SelectField source="status" choices={statusChoices} />
                <TextField source="expected_value" />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const leadsFieldSchema: FieldSchema = {
    customer_name: { required: true },
    company_name: {},
    phone: {},
    email: {},
    lead_source: {},
    assigned_employee_id: { resource: 'employees' },
    status: { ui: 'select', required: true, choices: statusChoices },
    expected_value: {},
    notes: { ui: 'multiline' }
};
const leadsSearchableFields: string[] = [
    'customer_name',
    'company_name',
    'assigned_employee.first_name',
    'assigned_employee.last_name',
    'phone',
    'email',
    'lead_source',
    'status',
    'expected_value'
];

export const LeadsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.customer_name}
        fieldSchema={ leadsFieldSchema}
        actionDefs={ leadsActionDefs}
        searchableFields={ leadsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<LeadsList/>}
        create={<LeadCreate/>}
        edit={<LeadEdit/>}
        show={<LeadShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<LeadsCardList/>}
        hasColumnChooser
        sort={{ field: 'customer_name', order: 'ASC' }}
    />
)
export const LeadsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Leads" leftIcon={<ICON />} />
)
