import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, NumberLiveFilter, TextLiveFilter,
    DateLiveFilter,
    MoneyField,
    MoneyInput} from '@mahaswami/vc-frontend';
import { Description } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, NumberField, NumberInput,
    DateField,
    DateInput} from "react-admin";

export const RESOURCE = "complaints"
export const ICON = Description
export const PREFETCH: string[] = []

export const ComplaintsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const ComplaintsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const complaintsActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />,
    <NumberLiveFilter source="fine" label="Fine" show />,
    <DateLiveFilter source="complaint_on" label="Complaint Date" show />
]

export const ComplaintsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="title" />
                <DataTable.Col source="details" />
                <DataTable.Col source="mobile_number" field={TextField}/>
                <DataTable.Col source="fine" field={(props) => <MoneyField {...props} currency="INR" />}/>
                <DataTable.Col source="complaint_on" field={DateField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const ComplaintsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="title" variant='h6' />}>
                <TextField source="details" />
                <TextField source="mobile_number" />
            </CardGrid>
        </List>
    )
}

const ComplaintForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="title" />
            <TextInput source="details" />
            <TextInput source="mobile_number" />
            <MoneyInput source="fine" currency="INR" />
            <DateInput source="complaint_on" />
        </SimpleForm>
    )
}

const ComplaintEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <ComplaintForm />
        </Edit>
    )
}

const ComplaintCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <ComplaintForm />
        </Create>
    )
}

const ComplaintShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="title" />
                <TextField source="details" />
                <TextField source="mobile_number" />
                <MoneyField source="fine" currency="INR" />
                <DateField source="complaint_on" />
            </SimpleShowLayout>
        </Show>
    )
}

const complaintsFieldSchema: FieldSchema = {
    title: {},
    details: {},
    mobile_number: {type: 'text'},
    fine: {type: 'money', currency: 'INR'},
    complaint_on: {type: 'date'}
};
const complaintsSearchableFields: string[] = [
    'title',
    'details',
    'mobile_number'
];

export const ComplaintsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ complaintsFieldSchema}
        actionDefs={ complaintsActionDefs}
        searchableFields={ complaintsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<ComplaintsList/>}
        create={<ComplaintCreate/>}
        edit={<ComplaintEdit/>}
        show={<ComplaintShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<ComplaintsCardList/>}
        sort={{ field: 'title', order: 'ASC' }}
    />
)
export const ComplaintsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Complaints" leftIcon={<ICON />} />
)
