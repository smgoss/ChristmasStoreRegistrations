# Christmas Store Registration System - Architecture Diagrams

## System Architecture

```mermaid
graph TB
    %% User Layer
    User[👤 Users]
    Admin[🛡️ Admin Users]

    %% Frontend Layer
    subgraph "Frontend - Next.js 15"
        HomePage[🏠 Home Page]
        AdminPage[⚙️ Admin Dashboard] 
        RegisterForm[📝 Registration Form]
        Components[🧩 Shared Components]
    end

    %% API Layer
    subgraph "API Routes"
        SendInvite[📧 Send Invite API]
        SendConfirm[✅ Send Confirmation API]
        SendSMS[📱 Send SMS API]
        ValidateInvite[🔍 Validate Invite API]
    end

    %% AWS Amplify Backend
    subgraph "AWS Amplify Gen 2"
        subgraph "Authentication"
            Cognito[🔐 AWS Cognito]
            UserPool[👥 User Pool]
            AdminGroup[👑 Admin Group]
        end
        
        subgraph "Data Layer"
            GraphQL[🔗 GraphQL API]
            AppSync[⚡ AWS AppSync]
            DynamoDB[(🗄️ DynamoDB)]
        end
        
        subgraph "Lambda Functions"
            CreateAdmin[👤 Create Admin User]
            SendInviteFn[📧 Send Invite Email]
            SendConfirmFn[✅ Send Confirmation]
            SendSMSFn[📱 Send SMS]
        end
    end

    %% External Services
    subgraph "External Services"
        SES[📮 Amazon SES]
        Clearstream[📱 Clearstream API]
        Zippopotam[🏘️ Zippopotam API]
        Unsplash[🖼️ Unsplash Images]
    end

    %% Data Models in DynamoDB
    subgraph "Data Models"
        Registration[(📋 Registration)]
        TimeSlot[(⏰ TimeSlot)]
        RegConfig[(⚙️ RegistrationConfig)]
    end

    %% User Interactions
    User --> HomePage
    User --> RegisterForm
    Admin --> AdminPage
    Admin --> Cognito

    %% Frontend to API
    RegisterForm --> SendInvite
    RegisterForm --> SendConfirm
    RegisterForm --> SendSMS
    RegisterForm --> ValidateInvite

    %% API to Backend
    SendInvite --> SendInviteFn
    SendConfirm --> SendConfirmFn
    SendSMS --> SendSMSFn

    %% Backend Data Flow
    GraphQL --> AppSync
    AppSync --> DynamoDB
    DynamoDB --> Registration
    DynamoDB --> TimeSlot
    DynamoDB --> RegConfig

    %% Authentication Flow
    Cognito --> UserPool
    UserPool --> AdminGroup
    CreateAdmin --> UserPool

    %% External Service Integration
    SendInviteFn --> SES
    SendConfirmFn --> SES
    SendSMSFn --> Clearstream
    RegisterForm --> Zippopotam
    Components --> Unsplash

    %% Styling
    classDef userClass fill:#e1f5fe
    classDef frontendClass fill:#f3e5f5
    classDef apiClass fill:#fff3e0
    classDef backendClass fill:#e8f5e8
    classDef externalClass fill:#fce4ec
    classDef dataClass fill:#f1f8e9

    class User,Admin userClass
    class HomePage,AdminPage,RegisterForm,Components frontendClass
    class SendInvite,SendConfirm,SendSMS,ValidateInvite apiClass
    class Cognito,UserPool,AdminGroup,GraphQL,AppSync,CreateAdmin,SendInviteFn,SendConfirmFn,SendSMSFn backendClass
    class SES,Clearstream,Zippopotam,Unsplash externalClass
    class Registration,TimeSlot,RegConfig,DynamoDB dataClass
```

## User Registration Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant RF as 📝 Registration Form
    participant API as 🔗 API Routes
    participant GQL as ⚡ GraphQL/AppSync
    participant DB as 🗄️ DynamoDB
    participant SES as 📮 Amazon SES
    participant SMS as 📱 Clearstream

    Note over U,SMS: Christmas Store Registration Process

    U->>RF: Visit registration page
    RF->>GQL: Load registration config
    GQL->>DB: Query RegistrationConfig
    DB-->>GQL: Return config data
    GQL-->>RF: Registration settings
    
    alt Registration Closed
        RF-->>U: Show "Registration Closed" message
    else Invite Only Mode
        U->>RF: Enter invite token
        RF->>API: Validate invite token
        API->>GQL: Query invitation
        GQL->>DB: Check token validity
        DB-->>API: Token validation result
        API-->>RF: Validation response
        
        alt Invalid Token
            RF-->>U: Show error message
        else Valid Token
            RF-->>U: Show registration form
        end
    else Open Registration
        RF-->>U: Show registration form directly
    end

    Note over U,SMS: Registration Submission

    U->>RF: Fill registration form
    RF->>API: Validate postal code
    API->>+Zippopotam: Check postal code
    Zippopotam-->>-API: Location data
    API-->>RF: Validation result

    U->>RF: Submit registration
    RF->>API: Submit registration data
    API->>GQL: Create registration mutation
    GQL->>DB: Store registration
    DB-->>GQL: Registration created
    GQL-->>API: Success response
    API-->>RF: Registration confirmed

    par Send Email Confirmation
        API->>SES: Send confirmation email
        SES-->>U: Email delivered
    and Send SMS Confirmation
        API->>SMS: Send SMS confirmation
        SMS-->>U: SMS delivered
    end

    RF-->>U: Show success message
```

## Admin Management Flow

```mermaid
flowchart TD
    A[🛡️ Admin Login] --> B{Authenticated?}
    B -->|No| C[🔐 Login with Cognito]
    B -->|Yes| D[⚙️ Admin Dashboard]
    
    C --> E{Login Successful?}
    E -->|No| F[❌ Show Error]
    E -->|Yes| D
    
    D --> G[📊 View Registrations]
    D --> H[⚙️ Update Settings]
    D --> I[📧 Send Invitations]
    D --> J[⏰ Manage Time Slots]
    
    G --> K[📋 Registration List]
    K --> L[📄 Export Data]
    K --> M[✏️ Edit Registration]
    
    H --> N[💌 Update Contact Info]
    H --> O[🎯 Toggle Registration Mode]
    H --> P[📅 Set Event Dates]
    
    I --> Q[📝 Create Invite Tokens]
    Q --> R[📧 Send Invite Emails]
    
    J --> S[➕ Add Time Slots]
    J --> T[✏️ Edit Time Slots]
    J --> U[❌ Delete Time Slots]
    
    %% Save actions
    N --> V[💾 Save to DynamoDB]
    O --> V
    P --> V
    S --> V
    T --> V
    M --> V
    
    V --> W[✅ Success Notification]
    
    %% Styling
    classDef adminClass fill:#e3f2fd
    classDef actionClass fill:#fff3e0
    classDef dataClass fill:#f1f8e9
    classDef successClass fill:#e8f5e8
    
    class A,C,D adminClass
    class G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U actionClass
    class V dataClass
    class W successClass
```

## Data Model Relationships

```mermaid
erDiagram
    Registration {
        string id PK
        string firstName
        string lastName
        string email
        string phone
        string address
        string city
        string state
        string postalCode
        string country
        string timeSlotId FK
        string emergencyContactName
        string emergencyContactPhone
        int adultCount
        int childCount
        string dietaryRestrictions
        string specialRequests
        datetime createdAt
        datetime updatedAt
    }
    
    TimeSlot {
        string id PK
        datetime startTime
        datetime endTime
        int maxCapacity
        int currentCount
        boolean isAvailable
        string description
        datetime createdAt
        datetime updatedAt
    }
    
    RegistrationConfig {
        string id PK
        boolean isOpen
        boolean isInviteOnly
        string replyToEmail
        string contactPhone
        datetime eventStartDate
        datetime eventEndDate
        datetime registrationOpenDate
        datetime registrationCloseDate
        string welcomeMessage
        string closedMessage
        datetime createdAt
        datetime updatedAt
    }
    
    Invitation {
        string id PK
        string token
        string email
        boolean isUsed
        datetime expiresAt
        string createdBy
        datetime createdAt
        datetime usedAt
    }

    Registration ||--|| TimeSlot : "belongs to"
    Registration }o--|| RegistrationConfig : "uses config"
    Invitation ||--o| Registration : "enables registration"
```

## Security & Error Handling

```mermaid
flowchart TB
    subgraph "Security Layers"
        A[🔐 AWS Cognito Authentication]
        B[👑 Admin Group Authorization]
        C[🛡️ API Route Protection]
        D[✅ Zod Input Validation]
        E[🚫 Rate Limiting]
    end
    
    subgraph "Error Handling"
        F[📊 Standardized Error Responses]
        G[📝 Comprehensive Logging]
        H[🔄 Retry Mechanisms]
        I[❌ Graceful Degradation]
    end
    
    subgraph "Data Protection"
        J[🔒 Encrypted Data at Rest]
        K[🚦 HTTPS in Transit]
        L[🎭 No Sensitive Data in Logs]
        M[⏰ Token Expiration]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    
    E --> F
    F --> G
    G --> H
    H --> I
    
    I --> J
    J --> K
    K --> L
    L --> M
    
    classDef securityClass fill:#ffebee
    classDef errorClass fill:#fff3e0
    classDef dataClass fill:#e8f5e8
    
    class A,B,C,D,E securityClass
    class F,G,H,I errorClass
    class J,K,L,M dataClass
```