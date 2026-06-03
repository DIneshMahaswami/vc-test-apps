import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, MoneyField, MoneyInput, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { AssignmentTurnedIn } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, SelectField, SelectInput, AutocompleteInput, required} from "react-admin";
import { UnitsReferenceField, UnitsReferenceInput } from './properties.js';
import { ContractorsReferenceField, ContractorsReferenceInput } from './contractors.js';
import { ServiceRequestsReferenceField, ServiceRequestsReferenceInput } from './service_requests.js';

export const RESOURCE = "work_orders"
export const ICON = AssignmentTurnedIn
export const PREFETCH: string[] = ["units", "contractors", "service_requests"]

export const WorkOrdersReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const WorkOrdersReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const workOrdersActionDefs: ResourceActionDefs = {};

export const workOrderTypeChoices = [{ id: 'plumbing', name: 'Plumbing' }, { id: 'electrical', name: 'Electrical' }, { id: 'hvac', name: 'HVAC' }, { id: 'cleaning', name: 'Cleaning' }, { id: 'pest_control', name: 'Pest Control' }, { id: 'structural', name: 'Structural' }, { id: 'general', name: 'General' }];
export const WorkOrderTypeChoiceField = (props: any) => <SelectField {...props} choices={workOrderTypeChoices} />;

export const WorkOrderAmountMoneyField = (props: any) => <MoneyField {...props} currency="USD" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="unit_id" reference="units" label="Unit" />,
    <DateLiveFilter source="work_order_date" label="Work Order" />,
    <ChoicesLiveFilter source="work_order_type" label="Work Order Type" choiceLabels={workOrderTypeChoices} show />,
    <ReferenceLiveFilter source="contractor_id" reference="contractors" label="Contractor" />,
    <ReferenceLiveFilter source="service_request_id" reference="service_requests" label="Service Request" />,
    <MoneyLiveFilter source="work_order_amount" label="Work Order" currency="USD" />
]

export const WorkOrdersList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['work_order_amount']} >
                <DataTable.Col source="unit_id" field={UnitsReferenceField}/>
                <DataTable.Col source="work_order_date" field={DateField}/>
                <DataTable.Col source="work_order_type" field={WorkOrderTypeChoiceField} />
                <DataTable.Col source="contractor_id" field={ContractorsReferenceField}/>
                <DataTable.Col source="service_request_id" field={ServiceRequestsReferenceField}/>
                <DataTable.Col source="work_order_amount" field={WorkOrderAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const WorkOrdersCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<UnitsReferenceField source="unit_id" variant='h6' link={false} />}>
                <DateField source="work_order_date" />
                <SelectField source="work_order_type" choices={workOrderTypeChoices} />
            </CardGrid>
        </List>
    )
}

const WorkOrderForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <UnitsReferenceInput source="unit_id">
                <AutocompleteInput validate={required()} />
            </UnitsReferenceInput>
            <DateInput source="work_order_date" validate={required()} />
            <SelectInput source="work_order_type" choices={workOrderTypeChoices} validate={required()} />
            <ContractorsReferenceInput source="contractor_id" />
            <ServiceRequestsReferenceInput source="service_request_id" />
            <MoneyInput source="work_order_amount" currency="USD" />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const WorkOrderEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <WorkOrderForm />
        </Edit>
    )
}

const WorkOrderCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <WorkOrderForm />
        </Create>
    )
}

const WorkOrderShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <UnitsReferenceField source="unit_id" />
                <DateField source="work_order_date" />
                <SelectField source="work_order_type" choices={workOrderTypeChoices} />
                <ContractorsReferenceField source="contractor_id" />
                <ServiceRequestsReferenceField source="service_request_id" />
                <MoneyField source="work_order_amount" currency="USD" />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const workOrdersFieldSchema: FieldSchema = {
    unit_id: { required: true, resource: 'units' },
    work_order_date: { required: true,
            rule: { left: 'today', right: 0, operation: 'default' }
        },
    work_order_type: { ui: 'select', required: true, choices: workOrderTypeChoices,
    rule: { left: 'service_request.request_type', right: 0, operation: 'default' }
},
    contractor_id: { resource: 'contractors' },
    service_request_id: { resource: 'service_requests' },
    work_order_amount: { type: 'money', currency: 'USD' },
    notes: { ui: 'multiline' }
};
const workOrdersSearchableFields: string[] = [
    'unit.name',
    'contractor.name',
    'service_request.rental_agreement.unit.name',
    'service_request.rental_agreement.customer.business_name',
    'service_request.rental_agreement.customer.primary_contact_name',
    'service_request.rental_agreement.customer.secondary_contact_name',
    'service_request.rental_agreement.customer.registered_building_name',
    'service_request.customer.business_name',
    'service_request.customer.primary_contact_name',
    'service_request.customer.secondary_contact_name',
    'service_request.customer.registered_building_name',
    'work_order_type'
];

export const WorkOrdersResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('units', record.unit)}
        fieldSchema={ workOrdersFieldSchema}
        actionDefs={ workOrdersActionDefs}
        searchableFields={ workOrdersSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<WorkOrdersList/>}
        create={<WorkOrderCreate/>}
        edit={<WorkOrderEdit/>}
        show={<WorkOrderShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<WorkOrdersCardList/>}
        hasColumnChooser
        sort={{ field: 'unit.name', order: 'ASC' }}
    />
)
export const WorkOrdersMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Work Orders" leftIcon={<ICON />} />
)
