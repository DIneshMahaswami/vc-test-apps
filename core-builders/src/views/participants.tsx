import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, ReferenceLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { People } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, AutocompleteInput, required, useUnique} from "react-admin";
import { TrialSitesReferenceField, TrialSitesReferenceInput } from './trial_sites.js';

export const RESOURCE = "participants"
export const ICON = People
export const PREFETCH: string[] = ["trial_sites"]

export const ParticipantsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const ParticipantsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const participantsActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="trial_site_id" reference="trial_sites" label="Trial Site" />
]

export const ParticipantsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="name" />
                <DataTable.Col source="trial_site_id" field={TrialSitesReferenceField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const ParticipantsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="name" variant='h6' />}>
                <TrialSitesReferenceField source="trial_site_id" />
            </CardGrid>
        </List>
    )
}

const ParticipantForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="name" validate={[required(), unique()]} />
            <TrialSitesReferenceInput source="trial_site_id">
                <AutocompleteInput validate={required()} />
            </TrialSitesReferenceInput>
        </SimpleForm>
    )
}

const ParticipantEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <ParticipantForm />
        </Edit>
    )
}

const ParticipantCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <ParticipantForm />
        </Create>
    )
}

const ParticipantShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TrialSitesReferenceField source="trial_site_id" />
            </SimpleShowLayout>
        </Show>
    )
}

const participantsFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    trial_site_id: { required: true, resource: 'trial_sites' }
};
const participantsSearchableFields: string[] = [
    'name'
];

export const ParticipantsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ participantsFieldSchema}
        actionDefs={ participantsActionDefs}
        searchableFields={ participantsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<ParticipantsList/>}
        create={<ParticipantCreate/>}
        edit={<ParticipantEdit/>}
        show={<ParticipantShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<ParticipantsCardList/>}
        sort={{ field: 'name', order: 'ASC' }}
    />
)
export const ParticipantsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Participants" leftIcon={<ICON />} />
)
