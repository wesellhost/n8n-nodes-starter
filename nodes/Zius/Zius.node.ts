import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

export class Zius implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zius',
		name: 'zius',
		icon: 'fa:paper-plane', // Uses a built-in FontAwesome icon
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

		// Retrieve the credentials (secret and account ID)
		const credentials = await this.getCredentials('ziusApi');

		for (let i = 0; i < items.length; i++) {
			try {
				// Retrieve the inputs from the n8n interface
				const recipient = this.getNodeParameter('recipient', i) as string;
				const message = this.getNodeParameter('message', i) as string;

				// Construct the multipart/form-data POST request
				const options = {
					method: 'POST',
					url: 'https://zius.uk/api/send/whatsapp',
					formData: {
						secret: credentials.secret,
						account: credentials.account,
						recipient: recipient,
						type: 'text', // Hardcoded as per your curl request
						message: message,
					},
					json: true,
				};

				// Execute the HTTP request
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