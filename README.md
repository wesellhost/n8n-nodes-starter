<div align="center">
  <img src="https://raw.githubusercontent.com/wesellhost/n8n-nodes-starter/refs/heads/master/img/58b29e35-13ac-4a65-84de-562dbb250a67.png" alt="Zius for n8n" width="100%"/>
  <h1>n8n-nodes-zius</h1>
  <p>The official n8n community node for the Zius WhatsApp and SMS Gateway.</p>

  [![npm version](https://img.shields.io/npm/v/n8n-nodes-zius.svg?style=flat-square)](https://www.npmjs.com/package/n8n-nodes-zius)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
</div>

---

**Zius** is a comprehensive WhatsApp and SMS gateway platform that enables businesses to automate marketing, notifications, and bulk messaging through a powerful API and web dashboard. 

This custom node seamlessly integrates your Zius account directly into your **n8n** workflows, allowing you to control Contacts, Groups, WhatsApp messaging, and Android SMS Gateways straight from your workflow canvas.

## 🛠️ Installation

### Option 1: Install via n8n UI (Recommended)
You can install this node directly from your self-hosted n8n instance:
1. Go to **Settings > Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-zius` and click **Install**.

### Option 2: Install via npm (CLI)
If you are running a custom Docker build or managing your n8n instance via CLI, run the following command in your n8n custom nodes directory (usually `~/.n8n/custom/`):

npm install n8n-nodes-zius

---

## 🔐 Credentials Setup

All API requests require authentication using an API secret key.

1. Log in to your Zius Dashboard.
2. Navigate to **Tools > API Keys** and copy your **API Secret**.
3. *Optional:* If you are sending WhatsApp messages, find your WhatsApp Account Unique ID.
4. *Optional:* If using the Android Gateway, find your Android Device Unique ID.
5. In your n8n workflow, add the **Zius Full** node, click **Create New Credential**, and paste your keys into the respective fields.

---

## 📦 Node Operations

This node supports the following operations mapped to the Zius REST API:

### 🟢 WhatsApp Messaging
* **Send Single Message:** Send a targeted WhatsApp message to a recipient. Supports text, media, or document message types.
* **Send Bulk Messages:** Send WhatsApp messages to multiple recipients in a campaign.
* **Start Campaign:** Start or resume a WhatsApp campaign.
* **Stop Campaign:** Stop or pause a WhatsApp campaign.
* **Validate Phone Number:** Check if a phone number exists on WhatsApp.

### 📱 Android Gateway (SMS & USSD)
* **Get Devices:** Retrieve all connected Android devices.
* **Send USSD Request:** Send a USSD (Unstructured Supplementary Service Data) request to check balance, activate services, etc.
* **Get USSD Requests:** Retrieve all USSD requests and their responses.
* **Delete USSD Request:** Delete a specific USSD request by ID.
* **Delete Notification:** Delete a specific Android notification by ID.

### 👥 Contact Management
* **Create Contact:** Create a new contact in your Zius account.
* **Get All Contacts:** Retrieve all contacts with pagination support.
* **Delete Contact:** Delete a specific contact by ID.
* **Delete Unsubscribed Contact:** Delete an unsubscribed contact from your list.

### 📁 Group Management
* **Create Group:** Create a new contact group.
* **Get All Groups:** Retrieve all contact groups with pagination support.
* **Delete Group:** Delete a specific contact group by ID.

---

## 🛡️ Best Practices: Message Variation (Spintax)

When sending bulk WhatsApp messages, identical texts trigger spam filters and risk account bans. You must randomize your messages. Use Spintax to randomize messages and avoid spam filters.

**How to use Spintax in the Zius n8n Node:**
Simply use the `{word1|word2|word3}` format directly in the "Message" field of the node.

> `{Hello|Hi|Greetings|Hey} {John|there}, we have a {special|great|exclusive} offer for you today!`

Other best practices for bulk messaging include:
* Group contacts logically for targeted campaigns.
* Test messages with small groups before full campaigns.
* Monitor campaign performance in real-time.

---

## 🔗 Resources

* **Zius Official Website:** https://zius.uk
* **Zius API Documentation:** https://zius.uk/dashboard/docs
* **API Keys:** https://zius.uk/dashboard/tools/keys
* **Manage Webhooks:** https://zius.uk/dashboard/tools/webhooks
* **Manage Flows:** https://zius.uk/dashboard/tools/flows

## 📄 License
This project is licensed under the MIT License.
