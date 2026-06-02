import { TranslationMessages } from 'react-admin';
import { englishMessages, defineCatalog } from '@mahaswami/vc-frontend';

const customEnglishMessages = defineCatalog(englishMessages, {
    resources: {
        work_orders: {
            name: 'Work Orders',
        },
        service_requests: {
            name: 'Service Requests',
        },
        contractors: {
            name: 'Contractors',
        },
        payments: {
            name: 'Payments',
        },
        invoices: {
            name: 'Invoices',
        },
        leads: {
            name: 'Leads',
        },
        rental_agreements: {
            name: 'Rental Agreements',
        },
        customers: {
            name: 'Customers',
        },
        units: {
            name: 'Units',
        },
        properties: {
            name: 'Properties',
        },
        users: {
            name: 'Users',
        },
        settings: {
            name: 'Settings',
        },            
        // customers: {
        //     name: 'Customer |||| Customers',
        //     fields: {
        //         orders: 'Orders',
        //         first_seen: 'First seen',
        //         full_name: 'Name',
        //         groups: 'Segments',
        //         last_seen: 'Last seen',
        //         last_seen_gte: 'Visited Since',
        //         name: 'Name',
        //         total_spent: 'Total spent',
        //         password: 'Password',
        //         confirm_password: 'Confirm password',
        //         stateAbbr: 'State',
        //     },
        //     filters: {
        //         last_visited: 'Last visited',
        //         today: 'Today',
        //         this_week: 'This week',
        //         last_week: 'Last week',
        //         this_month: 'This month',
        //         last_month: 'Last month',
        //         earlier: 'Earlier',
        //         has_ordered: 'Has ordered',
        //         has_newsletter: 'Has newsletter',
        //         group: 'Segment',
        //     },
        //     fieldGroups: {
        //         identity: 'Identity',
        //         address: 'Address',
        //         stats: 'Stats',
        //         history: 'History',
        //         password: 'Password',
        //         change_password: 'Change Password',
        //     },
        //     page: {
        //         delete: 'Delete Customer',
        //     },
        //     errors: {
        //         password_mismatch:
        //             'The password confirmation is not the same as the password.',
        //     },
        //     notifications: {
        //         created:
        //             'Customer created |||| %{smart_count} customers created',
        //         updated:
        //             'Customer updated |||| %{smart_count} customers updated',
        //         deleted:
        //             'Customer deleted |||| %{smart_count} customers deleted',
        //     },
        // },
    },
}) as TranslationMessages;

export default customEnglishMessages;
