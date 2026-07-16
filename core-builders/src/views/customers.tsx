import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, tabbedFormDefaults, layoutDefaults, listDefaults, showDefaults,
	RowActions, DataTable, WizardForm, createReferenceField, createReferenceInput,
	type ResourceActionDefs, type FieldSchema, SimpleShowLayout, SimpleFileField, SimpleFileInput, CardGrid, ChoicesLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { People } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    TabbedForm, TabbedShowLayout,
    type ListProps, TextField, TextInput, SelectField, SelectInput, required, useUnique} from "react-admin";
import { Box } from '@mui/material';

export const RESOURCE = "customers"
export const ICON = People
export const PREFETCH: string[] = []

export const CustomersReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const CustomersReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const customersActionDefs: ResourceActionDefs = {};

export const businessTypeChoices = [{ id: 'it_services', name: 'IT Services' }, { id: 'retail', name: 'Retail' }, { id: 'manufacturing', name: 'Manufacturing' }, { id: 'healthcare', name: 'Healthcare' }, { id: 'education', name: 'Education' }, { id: 'consulting', name: 'Consulting' }];
export const BusinessTypeChoiceField = (props: any) => <SelectField {...props} choices={businessTypeChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ChoicesLiveFilter source="business_type" label="Business Type" choiceLabels={businessTypeChoices} show />
]

export const CustomersList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['primary_contact_phone', 'primary_contact_email', 'secondary_contact_name', 'secondary_contact_phone', 'secondary_contact_email', 'registered_building_name', 'registered_suite', 'registered_address_line_1', 'registered_address_line_2', 'registered_city', 'registered_state', 'registered_pin_code']} >
                <DataTable.Col source="business_name" />
                <DataTable.Col source="business_type" field={BusinessTypeChoiceField} />
                <DataTable.Col source="business_pan" />
                <DataTable.Col source="gstin" />
                <DataTable.Col source="primary_contact_name" />
                <DataTable.Col source="primary_contact_phone" />
                <DataTable.Col source="primary_contact_email" />
                <DataTable.Col source="secondary_contact_name" />
                <DataTable.Col source="secondary_contact_phone" />
                <DataTable.Col source="secondary_contact_email" />
                <DataTable.Col source="registered_building_name" />
                <DataTable.Col source="registered_suite" />
                <DataTable.Col source="registered_address_line_1" />
                <DataTable.Col source="registered_address_line_2" />
                <DataTable.Col source="registered_city" />
                <DataTable.Col source="registered_state" />
                <DataTable.Col source="registered_pin_code" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const CustomersCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="business_name" variant='h6' />}>
                <SelectField source="business_type" choices={businessTypeChoices} />
                <TextField source="business_pan" />
            </CardGrid>
        </List>
    )
}

const BusinessInformationInputs = () => {
    const unique = useUnique();
    return (
        <>
            <TextInput source="business_name" validate={required()} />
            <SelectInput source="business_type" choices={businessTypeChoices} validate={required()} />
            <TextInput source="business_pan" validate={[required(), unique()]} />
            <TextInput source="gstin" validate={[required(), unique()]} />
        </>
    )
}

const ContactsInputs = () => {
    const unique = useUnique();
    return (
        <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: '1em', width: '100%' }}>
                <TextInput source="primary_contact_name" validate={required()} />
                <TextInput source="primary_contact_phone" validate={required()} />
                <TextInput source="primary_contact_email" validate={[required(), unique()]} />
                <TextInput source="secondary_contact_name" />
                <TextInput source="secondary_contact_phone" />
                <TextInput source="secondary_contact_email" />
            </Box>
        </>
    )
}

const AddressDocumentsInputs = () => {
    return (
        <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: '1em', width: '100%' }}>
                <TextInput source="registered_building_name" />
                <TextInput source="registered_suite" />
                <TextInput source="registered_address_line_1" />
                <TextInput source="registered_address_line_2" />
                <TextInput source="registered_city" />
                <TextInput source="registered_state" />
                <TextInput source="registered_pin_code" />
                <SimpleFileInput source="incorporation_certificate_attachment_file_id" />
                <SimpleFileField source="incorporation_certificate_attachment_file_id" title="incorporation_certificate_attachment_file_name" />
                <SimpleFileInput source="memorandum_of_articles_attachment_file_id" />
                <SimpleFileField source="memorandum_of_articles_attachment_file_id" title="memorandum_of_articles_attachment_file_name" />
                <SimpleFileInput source="articles_of_association_attachment_file_id" />
                <SimpleFileField source="articles_of_association_attachment_file_id" title="articles_of_association_attachment_file_name" />
                <SimpleFileInput source="gst_registration_attachment_file_id" />
                <SimpleFileField source="gst_registration_attachment_file_id" title="gst_registration_attachment_file_name" />
            </Box>
        </>
    )
}

const CustomerEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <TabbedForm {...tabbedFormDefaults(props)}>
                <TabbedForm.Tab label="Business Information">
                    <BusinessInformationInputs/>
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Contacts">
                    <ContactsInputs/>
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Address & Documents">
                    <AddressDocumentsInputs/>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    )
}

const CustomerCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <WizardForm>
                <WizardForm.Step label='Business Information'>
                    <BusinessInformationInputs/>
                </WizardForm.Step>
                <WizardForm.Step label='Contacts'>
                    <ContactsInputs/>
                </WizardForm.Step>
                <WizardForm.Step label='Address & Documents'>
                    <AddressDocumentsInputs/>
                </WizardForm.Step>
            </WizardForm>
        </Create>
    )
}

const CustomerShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <TabbedShowLayout {...layoutDefaults(props)}>
                <TabbedShowLayout.Tab label="Business Information">
                    <TextField source="business_name" />
                    <SelectField source="business_type" choices={businessTypeChoices} />
                    <TextField source="business_pan" />
                    <TextField source="gstin" />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Contacts">
                    <SimpleShowLayout display={'grid'} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
                        <TextField source="primary_contact_name" />
                        <TextField source="primary_contact_phone" />
                        <TextField source="primary_contact_email" />
                        <TextField source="secondary_contact_name" />
                        <TextField source="secondary_contact_phone" />
                        <TextField source="secondary_contact_email" />
                    </SimpleShowLayout>
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Address & Documents">
                    <SimpleShowLayout display={'grid'} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
                        <TextField source="registered_building_name" />
                        <TextField source="registered_suite" />
                        <TextField source="registered_address_line_1" />
                        <TextField source="registered_address_line_2" />
                        <TextField source="registered_city" />
                        <TextField source="registered_state" />
                        <TextField source="registered_pin_code" />
                        <SimpleFileField source="incorporation_certificate_attachment_file_id" title="incorporation_certificate_attachment_file_name" />
                        <SimpleFileField source="memorandum_of_articles_attachment_file_id" title="memorandum_of_articles_attachment_file_name" />
                        <SimpleFileField source="articles_of_association_attachment_file_id" title="articles_of_association_attachment_file_name" />
                        <SimpleFileField source="gst_registration_attachment_file_id" title="gst_registration_attachment_file_name" />
                    </SimpleShowLayout>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    )
}

const customersFieldSchema: FieldSchema = {
    business_name: { required: true },
    business_type: { ui: 'select', required: true, choices: businessTypeChoices },
    business_pan: { required: true, unique: true },
    gstin: { required: true, unique: true },
    primary_contact_name: { required: true },
    primary_contact_phone: { required: true },
    primary_contact_email: { required: true, unique: true },
    secondary_contact_name: {},
    secondary_contact_phone: {},
    secondary_contact_email: {},
    registered_building_name: {},
    registered_suite: {},
    registered_address_line_1: {},
    registered_address_line_2: {},
    registered_city: {},
    registered_state: {},
    registered_pin_code: {},
    incorporation_certificate_attachment_file_id: {},
    memorandum_of_articles_attachment_file_id: {},
    articles_of_association_attachment_file_id: {},
    gst_registration_attachment_file_id: {}
};
const customersSearchableFields: string[] = [
    'business_name',
    'primary_contact_name',
    'secondary_contact_name',
    'registered_building_name',
    'business_type',
    'business_pan',
    'gstin',
    'primary_contact_phone',
    'primary_contact_email',
    'secondary_contact_phone',
    'secondary_contact_email',
    'registered_suite',
    'registered_address_line_1',
    'registered_address_line_2',
    'registered_city',
    'registered_state',
    'registered_pin_code'
];

export const CustomersResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.business_name}
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
        hasSearch
        cardList={<CustomersCardList/>}
        hasColumnChooser
        sort={{ field: 'business_name', order: 'ASC' }}
    />
)
export const CustomersMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Customers" leftIcon={<ICON />} />
)
