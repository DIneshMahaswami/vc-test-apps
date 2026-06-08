import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, BooleanLiveFilter, DateLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { People } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, BooleanField, BooleanInput, required, useUnique} from "react-admin";

export const RESOURCE = "employees"
export const ICON = People
export const PREFETCH: string[] = []

export const EmployeesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const EmployeesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const employeesActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />,
    <DateLiveFilter source="joining_date" label="Joining" />,
    <BooleanLiveFilter source="is_active" label="Active" />
]

export const EmployeesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['joining_date', 'is_active']} >
                <DataTable.Col source="employee_code" />
                <DataTable.Col source="first_name" />
                <DataTable.Col source="last_name" />
                <DataTable.Col source="email" />
                <DataTable.Col source="phone" />
                <DataTable.Col source="joining_date" field={DateField}/>
                <DataTable.Col source="is_active" field={BooleanField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const EmployeesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="employee_code" variant='h6' />}>
                <TextField source="first_name" />
                <TextField source="last_name" />
            </CardGrid>
        </List>
    )
}

const EmployeeForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <TextInput source="employee_code" validate={[required(), unique()]} />
            <TextInput source="first_name" validate={required()} />
            <TextInput source="last_name" />
            <TextInput source="email" validate={[required(), unique()]} />
            <TextInput source="phone" />
            <DateInput source="joining_date" />
            <BooleanInput source="is_active" />
        </SimpleForm>
    )
}

const EmployeeEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <EmployeeForm />
        </Edit>
    )
}

const EmployeeCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <EmployeeForm />
        </Create>
    )
}

const EmployeeShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="employee_code" />
                <TextField source="first_name" />
                <TextField source="last_name" />
                <TextField source="email" />
                <TextField source="phone" />
                <DateField source="joining_date" />
                <BooleanField source="is_active" />
            </SimpleShowLayout>
        </Show>
    )
}

const employeesFieldSchema: FieldSchema = {
    employee_code: { required: true, unique: true },
    first_name: { required: true },
    last_name: {},
    email: { required: true, unique: true },
    phone: {},
    joining_date: {},
    is_active: {}
};
const employeesSearchableFields: string[] = [
    'first_name',
    'last_name',
    'employee_code',
    'email',
    'phone'
];

export const EmployeesResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.employee_code}
        fieldSchema={ employeesFieldSchema}
        actionDefs={ employeesActionDefs}
        searchableFields={ employeesSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<EmployeesList/>}
        create={<EmployeeCreate/>}
        edit={<EmployeeEdit/>}
        show={<EmployeeShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<EmployeesCardList/>}
        hasColumnChooser
        sort={{ field: 'first_name', order: 'ASC' }}
    />
)
export const EmployeesMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Employees" leftIcon={<ICON />} />
)
