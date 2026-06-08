import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, CardGrid, createReferenceField, createReferenceInput, ChoicesLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Group } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, required, useUnique} from "react-admin";

export const RESOURCE = "customers"
export const ICON = Group
export const PREFETCH: string[] = []

export const CustomersReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const CustomersReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const customersActionDefs: ResourceActionDefs = {};

export const customerTypeChoices = [{ id: 'individual', name: 'Individual' }, { id: 'business', name: 'Business' }, { id: 'government', name: 'Government' }];
export const CustomerTypeChoiceField = (props: any) => <SelectField {...props} choices={customerTypeChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ChoicesLiveFilter source="customer_type" label="Customer Type" choiceLabels={customerTypeChoices} show />
]

export const CustomersList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['gstin', 'address_line_1', 'city', 'state', 'pin_code']} >
                <DataTable.Col source="customer_name" />
                <DataTable.Col source="customer_type" field={CustomerTypeChoiceField} />
                <DataTable.Col source="contact_person" />
                <DataTable.Col source="phone" />
                <DataTable.Col source="email" />
                <DataTable.Col source="gstin" />
                <DataTable.Col source="address_line_1" />
                <DataTable.Col source="city" />
                <DataTable.Col source="state" />
                <DataTable.Col source="pin_code" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const CustomersCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="customer_name" variant='h6' />}>
                <SelectField source="customer_type" choices={customerTypeChoices} />
                <TextField source="contact_person" />
            </CardGrid>
        </List>
    )
}

const CustomerForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <TextInput source="customer_name" validate={[required(), unique()]} />
            <SelectInput source="customer_type" choices={customerTypeChoices} validate={required()} />
            <TextInput source="contact_person" />
            <TextInput source="phone" />
            <TextInput source="email" />
            <TextInput source="gstin" />
            <TextInput source="address_line_1" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="pin_code" />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const CustomerEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <CustomerForm />
        </Edit>
    )
}

const CustomerCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <CustomerForm />
        </Create>
    )
}

const CustomerShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="customer_name" />
                <SelectField source="customer_type" choices={customerTypeChoices} />
                <TextField source="contact_person" />
                <TextField source="phone" />
                <TextField source="email" />
                <TextField source="gstin" />
                <TextField source="address_line_1" />
                <TextField source="city" />
                <TextField source="state" />
                <TextField source="pin_code" />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const customersFieldSchema: FieldSchema = {
    customer_name: { required: true, unique: true },
    customer_type: { ui: 'select', required: true, choices: customerTypeChoices },
    contact_person: {},
    phone: {},
    email: {},
    gstin: {},
    address_line_1: {},
    city: {},
    state: {},
    pin_code: {},
    notes: { ui: 'multiline' }
};
const customersSearchableFields: string[] = [
    'customer_name',
    'customer_type',
    'contact_person',
    'phone',
    'email',
    'gstin',
    'address_line_1',
    'city',
    'state',
    'pin_code'
];

export const CustomersResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.customer_name}
        fieldSchema={ customersFieldSchema}
        actionDefs={ customersActionDefs}
        searchableFields={ customersSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<CustomersList/>}
        create={<CustomerCreate/>}
        edit={<CustomerEdit/>}
        show={<CustomerShow/>}
        hasDialog
        hasLiveUpdate
        cardList={<CustomersCardList/>}
        hasColumnChooser
        sort={{ field: 'customer_name', order: 'ASC' }}
    />
)
export const CustomersMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Customers" leftIcon={<ICON />} />
)
