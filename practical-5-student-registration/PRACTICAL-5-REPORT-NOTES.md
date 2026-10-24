# Practical 5 - Report Notes

## Problem Definition
Create a student registration form using HTML5 input types and JavaScript validation for name, email, mobile number, password, confirm password, course, year, gender, and terms acceptance. Use regular expressions for validation.

## Implementation Summary
The page uses semantic HTML form controls and CSS for a plain, responsive layout. JavaScript validates the input fields, checks password strength, compares the password and confirmation, and displays messages next to the corresponding fields. Validation is triggered during input, change, blur, and form submission.

## Analysis Questions
1. **Are correct input types and attributes used?** Yes. The form uses text, email, tel, password, select, radio, and checkbox controls with labels, required indicators, autocomplete, and descriptive attributes.
2. **Are validation errors displayed near the relevant fields?** Yes. Each field has a dedicated error message element, and invalid controls receive `aria-invalid="true"`.
3. **Is password strength checked?** Yes. A strength indicator checks length, uppercase, lowercase, number, and symbol requirements.
4. **Is the form accessible using keyboard and screen-reader-friendly labels?** The form uses associated labels, fieldset and legend for gender, visible focus styles, and live regions for error and status messages.

## Conclusion
The practical demonstrates how HTML5 and JavaScript can be combined to create an accessible student registration form with regular-expression validation, password strength checking, and clear field-level error handling. It also shows how real-time feedback can help users correct mistakes before submitting a form.

## Important Note
The form validates data in the browser only. A real registration system would also require server-side validation and secure handling of submitted information.
