import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, MoneyField, MoneyInput, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { TrendingUp } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, AutocompleteInput, required} from "react-admin";
import { EmployeesReferenceField, EmployeesReferenceInput } from './employees.js';

export const RESOURCE = "sales_targets"
export const ICON = TrendingUp
export const PREFETCH: string[] = ["employees"]

export const SalesTargetsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const SalesTargetsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const salesTargetsActionDefs: ResourceActionDefs = {};

export const TargetAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const AchievedAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="employee_id" reference="employees" label="Employee" />,
    <MoneyLiveFilter source="target_amount" label="Target" currency="INR" />,
    <MoneyLiveFilter source="achieved_amount" label="Achieved" currency="INR" />
]

export const SalesTargetsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="employee_id" field={EmployeesReferenceField}/>
                <DataTable.Col source="target_month" />
                <DataTable.Col source="target_amount" field={TargetAmountMoneyField}/>
                <DataTable.Col source="achieved_amount" field={AchievedAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const SalesTargetsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<EmployeesReferenceField source="employee_id" variant='h6' link={false} />}>
                <TextField source="target_month" />
                <MoneyField source="target_amount" currency="INR" />
            </CardGrid>
        </List>
    )
}

const SalesTargetForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <EmployeesReferenceInput source="employee_id">
                <AutocompleteInput validate={required()} />
            </EmployeesReferenceInput>
            <TextInput source="target_month" validate={required()} />
            <MoneyInput source="target_amount" currency="INR" validate={required()} />
            <MoneyInput source="achieved_amount" currency="INR" />
        </SimpleForm>
    )
}

const SalesTargetEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <SalesTargetForm />
        </Edit>
    )
}

const SalesTargetCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <SalesTargetForm />
        </Create>
    )
}

const SalesTargetShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <EmployeesReferenceField source="employee_id" />
                <TextField source="target_month" />
                <MoneyField source="target_amount" currency="INR" />
                <MoneyField source="achieved_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

const salesTargetsFieldSchema: FieldSchema = {
    employee_id: { required: true, resource: 'employees' },
    target_month: { required: true },
    target_amount: { type: 'money', currency: 'INR', required: true },
    achieved_amount: { type: 'money', currency: 'INR' }
};
const salesTargetsSearchableFields: string[] = [
    'employee.first_name',
    'employee.last_name',
    'target_month'
];

export const SalesTargetsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('employees', record.employee)}
        fieldSchema={ salesTargetsFieldSchema}
        actionDefs={ salesTargetsActionDefs}
        searchableFields={ salesTargetsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<SalesTargetsList/>}
        create={<SalesTargetCreate/>}
        edit={<SalesTargetEdit/>}
        show={<SalesTargetShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<SalesTargetsCardList/>}
        sort={{ field: 'employee.first_name', order: 'ASC' }}
    />
)
export const SalesTargetsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Sales Targets" leftIcon={<ICON />} />
)
