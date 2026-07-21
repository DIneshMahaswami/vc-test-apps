import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { ContactMail } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { UnitsReferenceField, UnitsReferenceInput } from './properties.js';
import { TagsInput } from '../components/TagsInput';
import { TagsField } from '../components/TagsField';

export const RESOURCE = "leads"
export const ICON = ContactMail
export const PREFETCH: string[] = ["units"]

export const LeadsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const LeadsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const leadsActionDefs: ResourceActionDefs = {};

export const statusChoices = [{ id: 'new', name: 'New' }, { id: 'contacted', name: 'Contacted' }, { id: 'site_visit_scheduled', name: 'Site Visit Scheduled' }, { id: 'negotiating', name: 'Negotiating' }, { id: 'lost', name: 'Lost' }, { id: 'converted', name: 'Converted' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="unit_id" reference="units" label="Unit" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />,
    <DateLiveFilter source="inquiry_date" label="Inquiry" />
]

export const LeadsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['customer_email']} >
                <DataTable.Col source="unit_id" field={UnitsReferenceField}/>
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="inquiry_date" field={DateField}/>
                <DataTable.Col source="customer_name" />
                <DataTable.Col source="customer_phone" />
                <DataTable.Col source="customer_email" />
                <DataTable.Col source="lead_tag_ids" field={TagsField} />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const LeadsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<UnitsReferenceField source="unit_id" variant='h6' link={false} />}>
                <SelectField source="status" choices={statusChoices} />
                <DateField source="inquiry_date" />
                <TagsField source='lead_tag_ids' />
            </CardGrid>
        </List>
    )
}

const LeadForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <UnitsReferenceInput source="unit_id">
                <AutocompleteInput validate={required()} />
            </UnitsReferenceInput>
            <SelectInput source="status" choices={statusChoices} validate={required()} />
            <TagsInput source="lead_tag_ids" validate={required()} />
            <DateInput source="inquiry_date" validate={required()} />
            <TextInput source="customer_name" validate={required()} />
            <TextInput source="customer_phone" />
            <TextInput source="customer_email" />
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
                <UnitsReferenceField source="unit_id" />
                <SelectField source="status" choices={statusChoices} />
                <DateField source="inquiry_date" />
                <TextField source="customer_name" />
                <TextField source="customer_phone" />
                <TextField source="customer_email" />
                <TagsField source="lead_tag_ids" />
            </SimpleShowLayout>
        </Show>
    )
}

const leadsFieldSchema: FieldSchema = {
    unit_id: { required: true, resource: 'units' },
    status: { ui: 'select', required: true, choices: statusChoices,
                rule: { left: 'new', leftMode: 'value', right: 0, operation: 'default' }
            },
    inquiry_date: { required: true,
    rule: { left: 'today', right: 0, operation: 'default' }
    },
    customer_name: { required: true },
    customer_phone: {},
    customer_email: {},
    lead_tag_ids: {
        ui: 'tags', 
        context: 'leads_tags', 
        options: {
            allowEdit: true,
            allowCreate: true,
            showColor: true,
            showDescription: true,
        }
    }
};
const leadsSearchableFields: string[] = [
    'unit.name',
    'customer_name',
    'status',
    'customer_phone',
    'customer_email'
];

export const LeadsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('units', record.unit)}
        fieldSchema={ leadsFieldSchema}
        actionDefs={ leadsActionDefs}
        searchableFields={ leadsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<LeadsList/>}
        create={<LeadCreate/>}
        edit={<LeadEdit/>}
        show={<LeadShow/>}
        // hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<LeadsCardList/>}
        hasColumnChooser
        sort={{ field: 'unit.name', order: 'ASC' }}
    />
)
export const LeadsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Leads" leftIcon={<ICON />} />
)
