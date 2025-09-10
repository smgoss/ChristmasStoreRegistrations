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

3. Deploy the Amplify backend (required when schema changes):
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

### Security and Data Flow

- Client no longer writes directly to Amplify Data for registrations. All registration submissions go through the server route `POST /api/register` which:
  - Validates payload (Zod schema)
  - Enforces duplicate email/phone checks
  - Checks time-slot capacity on the server
  - Creates the registration and child records server-side
  - Performs a post-create capacity recheck and rolls back if the slot overfills under race conditions
- Public API key only allows reads. Admin actions use Cognito User Pools.

Rate limiting:
- The `POST /api/register` endpoint enforces a simple in-memory rate limit (10 requests/min per IP) to deter abuse in development. For production, use a durable store or upstream WAF.

### CAPTCHA (Anti-bot)

Recommended: AWS WAF CAPTCHA at the edge (no app changes required).

High-level steps:
- Create a WAFv2 Web ACL (scope: CLOUDFRONT) with rules:
  - AWS Managed Rule sets (Common, Bot Control optional)
  - A path-based or rate-based rule that applies CAPTCHA action to `/api/register` (and other sensitive endpoints as desired)
- Associate the Web ACL with your Amplify Hosting CloudFront distribution(s)
- Optionally set an immunity time (e.g. 10–60 minutes) after solving

CLI example (sketch):
1. Create Web ACL (CLOUDFRONT scope).
2. Add a rule with `Captcha` action where URI path matches `^/api/register`.
3. Associate: `aws wafv2 associate-web-acl --web-acl-arn <WEB_ACL_ARN> --resource-arn arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>`

Notes:
- Use CloudFront (global) scope for Amplify Hosting. Get the distribution ID from the Amplify Console or `aws cloudfront list-distributions`.
- Remove any reCAPTCHA environment variables; they are no longer used.

### Durable, Atomic Capacity (Optional)

For cross-instance atomic capacity enforcement, a Lambda function `reserve-registration` is scaffolded. To use it:
1. Set env vars on the function with your DynamoDB table names:
   - `REGISTRATION_TABLE`
   - `TIMESLOT_TABLE`
2. Implement the exact Key schema/UpdateExpression in `amplify/functions/reserve-registration/handler.ts` to match your tables.
3. Deploy backend: `npx ampx deploy`
4. Set `RESERVE_FUNCTION_NAME` in the app environment to the function name.

When configured, the server route calls the Lambda to perform a DynamoDB transaction updating the time slot count and creating the registration atomically. If the function is not configured, it falls back to a per-slot server lock with post-create recheck.

If you’re upgrading from a previous version, run:
```bash
# Install new dependency
npm install zod

# Apply backend auth rule changes
npx ampx deploy
```

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
- Usage tracking (secure, random tokens)
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

Local development
- Copy `.env.example` to `.env.local` (ignored by git) and set local-only values. Next.js loads `.env.local` automatically.
- Common local vars:
  - `NEXT_PUBLIC_LOCATION` (e.g., `location1`)
  - `RESERVE_FUNCTION_NAME` (optional; use if you enable durable capacity Lambda locally)

Amplify / production
- Set function env vars in Amplify Console (per Lambda), for example:
  - `FROM_EMAIL` (SES verified sender)
- Set app env vars for your app/branch in Amplify Console, for example:
  - `RESERVE_FUNCTION_NAME` (if using the durable capacity Lambda)

## Security Features

- Duplicate email/phone validation
- Invite token validation
- Admin authentication required
- API key protection for public endpoints
- Input validation and sanitization

## Support

For technical issues or questions, please check the AWS Amplify and Next.js documentation.
