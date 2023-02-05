## Digital Wallet API

A simple wallet API for simple transactions, such as credit and debit.

## Getting Started

These instructions will help you clone the project and run it on your local machine for development and testing purposes.

**Note: This project is still under development. Major changes will be made to the project and README in the near future.**

### Installation

Clone this repository to your local machine:

```jsx
git clone https://github.com/davidekete/Digital-wallet-API.git
```

To start the project, run the command below:

```jsx
npm run start
```

To start the project in watch mode, run the command below:

```jsx
npm run start:dev
```

## Endpoints

A list of the currently available endpoints on this API and usage examples.

### Creating a Wallet

Creates a unique new wallet based on a user’s email:

```jsx
POST http://localhost:5050/wallet/create
```

Parameters:

| Field | Type | Description |
| --- | --- | --- |
| email | `string` | New user’s email address. |

Payload example:

```jsx
{
    "email":"example@gmail.com"
}
```

Example response:

```jsx
{
    "message": "Wallet created successfully",
    "wallet": {
        "balance": 0,
        "active": true,
        "email": "example@gmail.com",
        "walletAddress": "5054521015",
        "updatedAt": "2023-02-05T21:42:32.226Z",
        "createdAt": "2023-02-05T21:42:32.226Z"
    }
}
```

### Debit a Wallet

Debits a user’s wallet based on the provided parameters:

```jsx
POST http://localhost:5050/wallet/debit
```

Parameters:

| Field | Type | Description |
| --- | --- | --- |
| amount | `float` | The amount to be subtracted from the sender’s account. |
| debitAddress | `walletID` | The sender’s wallet address. |
| recipientAddress | `walletID` | The receiver’s wallet address. |

Payload example:

```jsx
{
    "amount": 200,
    "debitAddress":9750575310,
    "recipientAddress":9999501014
}
```

Example response:

```jsx
{
    "message": "200 successfully debited from example@gmail.com"
}
```

### Credit a Wallet

Credits a user’s wallet based on the provided parameters:

```jsx
POST http://localhost:5050/wallet/credit
```

Parameters:

| Field | Type | Description |
| --- | --- | --- |
| amount | `float` | The amount to be added to the recipient’s account. |
| recipientAddress | `walletID` | The receiver’s wallet address. |

Payload example:

```jsx
{
    "amount": 100,
    "walletAddress":9750575310
}
```

Example response:

```jsx
{
    "message": "100 successfully added to 9750575310"
}
```

### Deactivate a Wallet

Deactivates a user’s wallet based on the provided `walletID`:

```jsx
POST http://localhost:5050/wallet/deactivate
```

Parameters:

| Field | Type | Description |
| --- | --- | --- |
| walletAddress | `walletID` | The wallet address to be deactivated. |

Payload example:

```jsx
{
    "walletAddress":9750575310
}
```

Example response:

```jsx
{
    "message": "Wallet deactivated successfully"
}
```

### Activate a Wallet

Activates a deactivated user’s wallet based on the provided `walletID`:

```jsx
POST http://localhost:5050/wallet/activate
```

Parameters:

| Field | Type | Description |
| --- | --- | --- |
| walletAddress | `walletID` | The wallet address to be activated. |

Payload example:

```jsx
{
    "walletAddress":9750575310
}
```

Example response:

```jsx
{
    "message": "Wallet activated successfully"
}
```

## Tools used

- Node.js
- Express
- Sequelize
- PostgreSQL
- Morgan
- Class-validator

## Author

- [David Ekete](https://twitter.com/David_Ekete)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details