# Christmas Store Registration App

A registration system for Christmas Store events built with Next.js and AWS Amplify.

## Features

- ✅ Registration form with personal and children information
- ✅ Time slot selection with capacity management  
- ✅ Email and phone duplicate validation
- ✅ Admin dashboard for managing registrations and time slots
- ✅ Unique invite link system
- ✅ Email confirmation system
- ✅ Responsive design with Tailwind CSS

## Required Information

The registration form collects:
- Name and contact information (email, phone)
- Number of children 18 and under
- Age and gender for each child (boy/girl)
- Preferred time slot (9:00 AM - 11:30 AM in 30-minute intervals)
- Childcare needs during shopping
- Referral information (optional)

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- AWS CLI configured
- AWS account with appropriate permissions

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd christmas-store-registration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Deploy the Amplify backend:
   ```bash
   npx ampx sandbox
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Configuration

#### Time Slots
- Default time slots: 9:00 AM to 11:30 AM (30-minute intervals)
- Default capacity: 10 registrations per slot
- Configurable through admin dashboard

#### Email Setup
1. Verify your sender email address in AWS SES
2. Update the `FROM_EMAIL` environment variable in the Lambda function
3. For production, move out of SES sandbox mode

#### Admin Access
1. Sign up for an admin account through the Cognito User Pool
2. Add the user to the 'admin' group in AWS Console
3. Access admin dashboard at `/admin`

## Usage

### Regular Registration
- Visit the home page
- Fill out the registration form
- Select available time slot
- Submit registration
- Receive email confirmation

### Invite-Only Registration
- Admin generates invite link for specific email
- Recipient clicks link to access registration
- Link becomes invalid after use

### Admin Functions
- View all registrations
- Export registration data to CSV
- Manage time slot capacities
- Generate invite links
- View registration statistics

## Project Structure

```
├── amplify/                 # AWS Amplify backend configuration
│   ├── auth/               # Authentication setup
│   ├── data/               # Database schema
│   └── functions/          # Lambda functions
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── admin/          # Admin dashboard
│   │   └── register/       # Invite registration
│   └── components/         # React components
└── public/                 # Static assets
```

## Database Schema

### Registration
- Personal information (name, email, phone)
- Time slot and requirements
- Invite token tracking
- Registration timestamp

### Child
- Linked to registration
- Age and gender information

### TimeSlotConfig
- Time slot definitions
- Capacity management
- Current registration counts

### InviteLink
- Unique tokens for invite-only registration
- Usage tracking
- Email association

## Deployment

### Development
```bash
npx ampx sandbox
npm run dev
```

### Production
```bash
npx ampx deploy --branch main
npm run build
```

## Environment Variables

Set the following in your Lambda function environment:
- `FROM_EMAIL`: Verified SES sender email address

## Security Features

- Duplicate email/phone validation
- Invite token validation
- Admin authentication required
- API key protection for public endpoints
- Input validation and sanitization

## Support

For technical issues or questions, please check the AWS Amplify and Next.js documentation.
