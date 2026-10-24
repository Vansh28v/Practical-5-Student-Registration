# Practical 5 - Validation Test Cases

| No. | Field / scenario | Sample input | Expected result |
|---|---|---|---|
| 1 | Valid name | Asha Patel | Accepted |
| 2 | Empty name | (blank) | Name required message |
| 3 | Invalid name | Asha123 | Name format error |
| 4 | Valid email | asha@example.com | Accepted |
| 5 | Invalid email | asha@ | Email format error |
| 6 | Valid mobile | 9876543210 | Accepted |
| 7 | Invalid mobile | 12345 | 10-digit mobile error |
| 8 | Course not selected | Select your course | Course required message |
| 9 | Year not selected | Select year | Year required message |
| 10 | Weak password | hello | Password requirements message |
| 11 | Strong password | Study@2026A | Accepted |
| 12 | Passwords differ | Study@2026A / Study@2026B | Password mismatch message |
| 13 | Gender not selected | No option selected | Gender required message |
| 14 | Terms not accepted | Checkbox unchecked | Confirmation message |
| 15 | All valid fields | Complete valid form | Success message shown |

## Sample valid test data
- Name: Asha Patel
- Email: asha@example.com
- Mobile: 9876543210
- Course: BCA
- Year: First year
- Gender: Female
- Password: Study@2026A
- Confirm password: Study@2026A
- Terms: Checked

The form is a frontend-only demonstration and does not send data to a server.
