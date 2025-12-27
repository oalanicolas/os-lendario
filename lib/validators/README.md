# Input Validators Library

Centralized, reusable validation functions for forms and input fields. Provides consistent error messages and type-safe validators.

## Overview

The validators library eliminates duplicated validation logic across forms. Each validator is a function that takes a value and returns an error message (string) or null if valid.

### Key Benefits

- **Consistency** - Same validation rules everywhere
- **Reusability** - Import validators in any form component
- **Type-Safe** - Full TypeScript support with generic types
- **Composable** - Chain multiple validators on a single field
- **Customizable** - Override default error messages

## Available Validators

### Basic Validators

#### `required(message?: string): Validator`

Ensures field is not empty.

```typescript
import { required } from '@/lib/validators';

const error = required()('');           // "This field is required"
const error = required()('hello');      // null (valid)
const error = required('Name is needed')(''); // "Name is needed"
```

#### `email(message?: string): Validator`

Validates email address format.

```typescript
import { email } from '@/lib/validators';

const error = email()('user@example.com');  // null (valid)
const error = email()('invalid-email');      // "Invalid email address"
```

#### `minLength(length: number, message?: string): Validator`

Ensures minimum character length.

```typescript
import { minLength } from '@/lib/validators';

const error = minLength(8)('password123');  // null (valid)
const error = minLength(8)('short');        // "Minimum 8 characters"
const error = minLength(8, 'Too short')('short'); // "Too short"
```

#### `maxLength(length: number, message?: string): Validator`

Ensures maximum character length.

```typescript
import { maxLength } from '@/lib/validators';

const error = maxLength(20)('valid');       // null (valid)
const error = maxLength(20)('very long text that exceeds limit'); // "Maximum 20 characters"
```

#### `url(message?: string): Validator`

Validates URL format.

```typescript
import { url } from '@/lib/validators';

const error = url()('https://example.com');  // null (valid)
const error = url()('not-a-url');           // "Invalid URL"
```

### Advanced Validators

#### `passwordStrength(message?: string): Validator`

Requires at least 3 of: uppercase, lowercase, number, special character.

```typescript
import { passwordStrength } from '@/lib/validators';

const error = passwordStrength()('Weak');           // "Password must contain..."
const error = passwordStrength()('Pass@123');      // null (valid)
```

#### `phone(country?: string, message?: string): Validator`

Validates phone numbers with country support (BR, US).

```typescript
import { phone } from '@/lib/validators';

const error = phone()('(11) 99999-9999');           // null (valid - Brazil)
const error = phone('US')('(555) 123-4567');        // null (valid - USA)
const error = phone()('invalid-phone');             // "Invalid BR phone number"
```

#### `username(message?: string): Validator`

Validates username (3-20 alphanumeric + underscore).

```typescript
import { username } from '@/lib/validators';

const error = username()('john_doe');   // null (valid)
const error = username()('ab');         // "Username must be 3-20 characters..."
```

#### `zipcode(country?: string, message?: string): Validator`

Validates zipcode with country support (US, BR).

```typescript
import { zipcode } from '@/lib/validators';

const error = zipcode()('12345');           // null (valid - USA)
const error = zipcode('BR')('12345-678');   // null (valid - Brazil)
const error = zipcode()('invalid');         // "Invalid US zipcode"
```

#### `creditCard(message?: string): Validator`

Validates credit card numbers using Luhn algorithm.

```typescript
import { creditCard } from '@/lib/validators';

const error = creditCard()('4532015112830366');  // null (valid)
const error = creditCard()('1234567890');        // "Invalid card number"
```

#### `custom(regex: RegExp, message: string): Validator`

Custom regex-based validator.

```typescript
import { custom } from '@/lib/validators';

const hexColorValidator = custom(/^#[0-9A-F]{6}$/i, 'Invalid hex color');
const error = hexColorValidator('#FF5733');   // null (valid)
const error = hexColorValidator('not-a-color'); // "Invalid hex color"
```

#### `match(getFieldValue, fieldName, message?): Validator`

Compares field with another field (e.g., password confirmation).

```typescript
import { match } from '@/lib/validators';

const formData = { password: 'Secret123!', confirm: 'Secret123!' };
const confirmValidator = match(
  (field) => formData[field],
  'password',
  'Passwords do not match'
);

const error = confirmValidator('Secret123!');   // null (valid)
const error = confirmValidator('Different');    // "Passwords do not match"
```

## Usage Patterns

### Basic Form Validation

```typescript
import { required, email, minLength } from '@/lib/validators';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validators = {
    email: [required(), email()],
    password: [required(), minLength(8)],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    Object.entries(validators).forEach(([field, fieldValidators]) => {
      const value = formData[field as keyof typeof formData];
      const fieldErrors = fieldValidators
        .map((validator) => validator(value))
        .filter((error): error is string => error !== null);

      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors[0]; // Show first error
      }
    });

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form valid!', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>}

      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      {errors.password && <span className="text-red-500">{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

### Validation Schema

```typescript
import { ValidationSchema, validateForm, validators } from '@/lib/validators';

const signupSchema: ValidationSchema = {
  email: [validators.required(), validators.email()],
  password: [
    validators.required(),
    validators.minLength(8),
    validators.passwordStrength(),
  ],
  username: [
    validators.required(),
    validators.username(),
  ],
  zipcode: [
    validators.zipcode('BR'),
  ],
};

// In component:
const errors = validateForm(formData, signupSchema);
if (Object.keys(errors).length > 0) {
  setErrors(errors);
  return;
}

// Submit form...
```

### Custom Error Messages

```typescript
import { required, email } from '@/lib/validators';

const schema = {
  email: [
    required('Please enter your email address'),
    email('Please enter a valid email'),
  ],
};
```

## Error Handling

### ValidationError Class

For advanced error handling, use the `ValidationError` class:

```typescript
import { ValidationError } from '@/lib/validators';

try {
  if (!email(email_value)) {
    throw new ValidationError('email', 'Invalid email address');
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Field "${error.field}" error: ${error.message}`);
  }
}
```

## Type Definitions

```typescript
// Individual validator type
export type Validator<T = string> = (value: T) => string | null;

// Validation schema type
export type ValidationSchema = Record<string, Validator[]>;

// Validation error class
export class ValidationError extends Error {
  field: string;
  constructor(field: string, message: string);
}
```

## Best Practices

1. **Use required() first** - Chain it first in validator arrays
2. **Custom messages for context** - Override messages for domain-specific language
3. **Country codes** - Specify country for phone/zipcode validators
4. **Validation timing** - Validate on blur for UX, on submit for safety
5. **Show first error** - Display only the first error per field for clarity
6. **Accessibility** - Use `aria-describedby` to link error messages to inputs

## Common Mistakes

❌ **Don't** forget to handle empty values in custom validators
```typescript
// Bad - errors on empty
const error = custom(/^\d+$/, 'Must be numeric')('');

// Good - check empty first
const error = custom(/^\d+$/, 'Must be numeric')('123'); // If required, other validator handles empty
```

❌ **Don't** use required() with optional fields
```typescript
// Bad - shows error for optional field
const schema = { nickname: [required()] };

// Good - only validate non-empty
const schema = { nickname: [minLength(2)] };
```

❌ **Don't** duplicate validators across forms
```typescript
// Bad
const form1Validators = { email: [email()] };
const form2Validators = { email: [email()] };

// Good
const emailValidators = [required(), email()];
const form1Validators = { email: emailValidators };
const form2Validators = { email: emailValidators };
```

## Performance Tips

- **Memoize validators** - Extract schema outside component to avoid recreation
- **Lazy validation** - Validate on blur instead of every keystroke
- **Batch validation** - Use `validateForm()` to validate all fields at once

## Supported Countries

### Phone
- `BR` - Brazil
- `US` - United States

### Zipcode
- `US` - United States
- `BR` - Brazil

To add more countries, submit a PR or use `custom()` with your own regex.
