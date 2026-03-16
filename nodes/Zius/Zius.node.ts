import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import FormData from 'form-data';

export class Zius implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zius',
		name: 'zius',
		icon: 'file:zius.png',
		group: ['transform'],
		version: 1,
		subtitle: 'Send WhatsApp Message',
		description: 'Send WhatsApp messages via Zius API',
		defaults: {
			name: 'Zius',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ziusApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Recipient Phone Number',
				name: 'recipient',
				type: 'string',
				default: '',
				placeholder: 'e.g., 201012345678',
				required: true,
				description: 'The phone number of the recipient',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				required: true,
				description: 'The text message to send',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('ziusApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const recipient = this.getNodeParameter('recipient', i) as string;
				const message = this.getNodeParameter('message', i) as string;

				// Build the form data exactly like your Node.js script
				const form = new FormData();
				form.append('secret', credentials.secret as string);
				form.append('account', credentials.account as string);
				form.append('recipient', recipient);
				form.append('type', 'text');
				form.append('message', message);

				const options = {
					method: 'POST' as const,
					url: 'https://zius.uk/api/send/whatsapp',
					body: form,
					headers: form.getHeaders(),
				};

				// Execute the request
				const responseData = await this.helpers.httpRequest(options);

				returnData.push({ json: responseData });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error);
			}
		}

		return [returnData];
	}
}