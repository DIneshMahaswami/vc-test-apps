import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Domain } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, AutocompleteInput, required} from "react-admin";
import { SitesReferenceField, SitesReferenceInput } from './sites.js';
import { TrialsReferenceField, TrialsReferenceInput } from './trials.js';

export const RESOURCE = "trial_sites"
export const ICON = Domain
export const PREFETCH: string[] = ["sites", "trials"]

export const TrialSitesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const TrialSitesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const trialSitesActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="site_id" reference="sites" label="Site" />,
    <ReferenceLiveFilter source="trial_id" reference="trials" label="Trial" />
]

export const TrialSitesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="site_id" field={SitesReferenceField}/>
                <DataTable.Col source="trial_id" field={TrialsReferenceField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const TrialSitesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<SitesReferenceField source="site_id" variant='h6' link={false} />}>
                <TrialsReferenceField source="trial_id" />
            </CardGrid>
        </List>
    )
}

const TrialSiteForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <SitesReferenceInput source="site_id">
                <AutocompleteInput validate={required()} />
            </SitesReferenceInput>
            <TrialsReferenceInput source="trial_id">
                <AutocompleteInput validate={required()} />
            </TrialsReferenceInput>
        </SimpleForm>
    )
}

const TrialSiteEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <TrialSiteForm />
        </Edit>
    )
}

const TrialSiteCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <TrialSiteForm />
        </Create>
    )
}

const TrialSiteShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <SitesReferenceField source="site_id" />
                <TrialsReferenceField source="trial_id" />
            </SimpleShowLayout>
        </Show>
    )
}

const trialSitesFieldSchema: FieldSchema = {
    site_id: { required: true, resource: 'sites' },
    trial_id: { required: true, resource: 'trials' }
};
const trialSitesSearchableFields: string[] = [
    'site.name',
    'trial.name'
];

export const TrialSitesResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => `${recordRep('sites', record.site)} - ${recordRep('trials', record.trial)}`}
        fieldSchema={ trialSitesFieldSchema}
        actionDefs={ trialSitesActionDefs}
        searchableFields={ trialSitesSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<TrialSitesList/>}
        create={<TrialSiteCreate/>}
        edit={<TrialSiteEdit/>}
        show={<TrialSiteShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<TrialSitesCardList/>}
        sort={{ field: 'site.name', order: 'ASC' }}
    />
)
export const TrialSitesMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Trial Sites" leftIcon={<ICON />} />
)
