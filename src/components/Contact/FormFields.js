
module.exports.fields = [
	{
		type: 'contactType',
		label: 'What would you like to contact us about?',
		placeholder: 'Select reason',
		name: 'reason',
		width: '12',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your first name:',
		placeholder: 'Enter your first name.',
		name: 'firstName',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your last name:',
		placeholder: 'Enter your last name.',
		name: 'lastName',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your email address:',
		placeholder: 'Enter your email address.',
		name: 'email',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your phone number:',
		placeholder: 'Enter your phone number.',
		name: 'phone',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your street address:',
		placeholder: 'Enter your street address.',
		name: 'address1',
		width: '12',
		required: true,
	},
	{
		type: 'text',
		label: null,
		placeholder: 'Address line 2.',
		name: 'address2',
		width: '12',
	},
	{
		type: 'text',
		label: 'Enter your city:',
		placeholder: 'Enter your city.',
		name: 'city',
		width: '12',
		required: true,
	},
	{
		type: 'country',
		label: 'Enter your state/province',
		placeholder: 'Select State / Province',
		name: 'state',
		options: '',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter your postal code',
		placeholder: 'Enter your postal code.',
		name: 'postalCode',
		width: '6',
		required: true,
	},
	{
		type: 'text',
		label: 'Enter the subject',
		placeholder: 'Enter the subject.',
		name: 'subject',
		width: '12',
		required: true,
	},
	{
		type: 'textarea',
		label: 'Enter the message',
		placeholder: 'Enter the message.',
		name: 'message',
		width: '12',
		required: true,
	},
];