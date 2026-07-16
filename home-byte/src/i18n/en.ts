import { TranslationMessages } from 'react-admin';
import { englishMessages, defineCatalog } from '@mahaswami/vc-frontend';

const customEnglishMessages = defineCatalog(englishMessages, {
    resources: {
        history: {
            name: 'History',
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
        properties: {
            name: "Properties"
        },
        units: {
            name: "Units"
        },
        customers: {
            name: "Customers",
            fields: {
                business_name: "Business Name",
                business_type: "Business Type",
                business_pan: "Business Pan",
                gstin: "Gstin",
                primary_contact_name: "Primary Contact Name",
                primary_contact_phone: "Primary Contact Phone",
                primary_contact_email: "Primary Contact Email",
                secondary_contact_name: "Secondary Contact Name",
                secondary_contact_phone: "Secondary Contact Phone",
                secondary_contact_email: "Secondary Contact Email",
                registered_building_name: "Registered Building Name",
                registered_suite: "Registered Suite",
                registered_address_line_1: "Registered Address Line 1",
                registered_address_line_2: "Registered Address Line 2",
                registered_city: "Registered City",
                registered_state: "Registered State",
                registered_pin_code: "Registered Pin Code",
                incorporation_certificate_attachment_file_id: "Incorporation Certificate Attachment File Id",
                memorandum_of_articles_attachment_file_id: "Memorandum Of Articles Attachment File Id",
                articles_of_association_attachment_file_id: "Articles Of Association Attachment File Id",
                gst_registration_attachment_file_id: "Gst Registration Attachment File Id"
            },
            choices: {
                business_type: {
                    it_services: "IT Services",
                    retail: "Retail",
                    manufacturing: "Manufacturing",
                    healthcare: "Healthcare",
                    education: "Education",
                    consulting: "Consulting"
                }
            }
        },
        rental_agreements: {
            name: "Rental Agreements",
            fields: {
                unit_id: "Unit Id",
                customer_id: "Customer Id",
                status: "Status",
                rental_start_date: "Rental Start Date",
                rental_end_date: "Rental End Date",
                agreement_date: "Agreement Date",
                rent_amount: "Rent Amount",
                security_deposit_amount: "Security Deposit Amount",
                rental_agreement_attachment_file_id: "Rental Agreement Attachment File Id"
            },
            choices: {
                status: {
                    draft: "Draft",
                    active: "Active",
                    terminated: "Terminated",
                    expired: "Expired"
                }
            }
        },
        leads: {
            name: "Leads",
            fields: {
                unit_id: "Unit Id",
                status: "Status",
                inquiry_date: "Inquiry Date",
                customer_name: "Customer Name",
                customer_phone: "Customer Phone",
                customer_email: "Customer Email"
            },
            choices: {
                status: {
                    new: "New",
                    contacted: "Contacted",
                    site_visit_scheduled: "Site Visit Scheduled",
                    negotiating: "Negotiating",
                    lost: "Lost",
                    converted: "Converted"
                }
            }
        },
        invoices: {
            name: "Invoices",
            fields: {
                invoice_no: "Invoice No",
                invoice_date: "Invoice Date",
                invoice_type: "Invoice Type",
                rental_agreement_id: "Rental Agreement Id",
                payment_status: "Payment Status",
                due_date: "Due Date",
                base_amount: "Base Amount",
                gst_amount: "Gst Amount",
                total_amount: "Total Amount",
                invoice_attachment_file_id: "Invoice Attachment File Id"
            },
            choices: {
                invoice_type: {
                    rent: "Rent",
                    maintenance: "Maintenance",
                    security_deposit: "Security Deposit",
                    late_fee: "Late Fee"
                },
            payment_status: {
                pending: "Pending",
                partially_paid: "Partially Paid",
                overdue: "Overdue",
                paid: "Paid"
            }
        }
        },
        payments: {
            name: "Payments",
            fields: {
                invoice_id: "Invoice Id",
                payment_reference: "Payment Reference",
                payment_date: "Payment Date",
                payment_method: "Payment Method",
                payment_amount: "Payment Amount"
            },
            choices: {
                payment_method: {
                    cash: "Cash",
                    cheque: "Cheque",
                    bank_transfer: "Bank Transfer",
                    upi: "UPI",
                    card: "Card"
                }
            }
        },
        contractors: {
            name: "Contractors",
            fields: {
                name: "Name",
                contractor_type: "Contractor Type",
                notes: "Notes"
            },
            choices: {
                contractor_type: {
                    plumbing: "Plumbing",
                    electrical: "Electrical",
                    cleaning: "Cleaning",
                    security: "Security",
                    hvac: "HVAC",
                    general_maintenance: "General Maintenance"
                }
            }
        },
        service_requests: {
            name: "Service Requests",
            fields: {
                rental_agreement_id: "Rental Agreement Id",
                customer_id: "Customer Id",
                request_type: "Request Type",
                status: "Status",
                request_date: "Request Date",
                completed_date: "Completed Date"
            },
            choices: {
                request_type: {
                    plumbing: "Plumbing",
                    electrical: "Electrical",
                    hvac: "HVAC",
                    cleaning: "Cleaning",
                    pest_control: "Pest Control",
                    structural: "Structural",
                    general: "General"
                },
                        status: {
                            open: "Open",
                            in_progress: "In Progress",
                            cancelled: "Cancelled",
                            completed: "Completed"
                        }
                    }
        },
        work_orders: {
            name: "Work Orders",
            fields: {
                unit_id: "Unit Id",
                work_order_date: "Work Order Date",
                work_order_type: "Work Order Type",
                contractor_id: "Contractor Id",
                service_request_id: "Service Request Id",
                work_order_amount: "Work Order Amount",
                notes: "Notes"
            },
            choices: {
                work_order_type: {
                    plumbing: "Plumbing",
                    electrical: "Electrical",
                    hvac: "HVAC",
                    cleaning: "Cleaning",
                    pest_control: "Pest Control",
                    structural: "Structural",
                    general: "General"
                }
            }
        }
    },
}) as TranslationMessages;

export default customEnglishMessages;
