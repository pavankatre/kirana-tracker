// import { Injectable, inject } from '@angular/core';
// import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
// import { InventoryService } from '../inventory';
// import { KiranaItem } from '../../../models/kirana-item';


// @Injectable({
//   providedIn: 'root',
// })

// export class NewItemService {
//   private fb = inject(FormBuilder);
//   private inventoryService = inject(InventoryService);
// constructor() {
//   this.formConfig.forEach(field => {
//     // Map JSON rules to Angular Validators
//     const rules = this.buildValidators(field.validations || {});
    
//     this.form.addControl(
//       field.key, 
//       this.fb.control(field.defaultValue || '', rules)
//     );
//   });
// }
//   // Initialize the form structure here to keep the component light
//   public form = this.fb.group({
//     name: ['', [Validators.required, Validators.minLength(2)]],
//     category: ['', Validators.required],
//     stockCount: [0, [Validators.required, Validators.min(0)]],
//     minThreshold: [2, [Validators.required, Validators.min(1)]]
//   });

//   get controls() { return this.form.controls; }

//   saveNewItem(): boolean {
//     if (this.form.valid) {
//       const formValue = this.form.value;
      
//       const newItem: KiranaItem = {
//         id: crypto.randomUUID(), // Modern browser unique ID
//         name: formValue.name!,
//         category: formValue.category!,
//         stockCount: Number(formValue.stockCount),
//         minThreshold: Number(formValue.minThreshold),
//         lastUpdated: new Date()
//       };

//       // Hand off the finalized object to the main Inventory Service
//       this.inventoryService.addItem(newItem);
//       this.form.reset({ stockCount: 0, minThreshold: 2 });
//       return true;
//     }
//     return false;
//   }

// private buildValidators(config: any): ValidatorFn[] {
//   const validators: ValidatorFn[] = [];
  
//   if (config.required) validators.push(Validators.required);
//   if (config.minLength) validators.push(Validators.minLength(config.minLength));
//   if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));
//   if (config.min !== undefined) validators.push(Validators.min(config.min));
  
//   return validators;
// }


// }




import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { InventoryService } from '../inventory';
import { KiranaItem } from '../../../models/kirana-item';

/**
 * Static import of the form configuration.
 * Note: Ensure 'resolveJsonModule' is true in tsconfig.json
 */
import inventorySchema from '../../../../assets/data/inventory-schema.json';

// Add this import to your existing service
import validationMessages from '../../../../assets/data/validation-messages.json';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewItemService {
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  // Holds the JSON schema defining fields, types, and validations
  public formConfig: any[] = inventorySchema;

  // Root form group initialized as empty; populated in constructor
  public form: FormGroup = this.fb.group({});

  private errorLibrary: any = validationMessages;

  constructor() {
    this.initializeForm();
  }

  /**
   * Loops through the JSON config and dynamically attaches FormControls
   * to the main FormGroup.
   */
  private initializeForm() {
    this.formConfig.forEach((field) => {
      const rules = this.buildValidators(field.validations || {});
      
      this.form.addControl(
        field.key,
        // Uses the nullish coalescing operator to fallback to empty string
        this.fb.control(field.defaultValue ?? '', rules)
      );
    });
  }

  /**
   * Getter for easy access to controls in the template
   * Usage: service.controls['name']
   */
  get controls() {
    return this.form.controls;
  }

  /**
   * Validates the form, transforms data to the KiranaItem model,
   * and saves it to the main Inventory state.
   */
  // saveNewItem(): boolean {
  //   if (this.form.valid) {
  //     // getRawValue includes disabled fields if any exist
  //     const formValue = this.form.getRawValue();

  //     const newItem: KiranaItem = {
  //       id: crypto.randomUUID(),
  //       name: formValue.name,
  //       category: formValue.category,
  //       // Explicit conversion to Number to handle string inputs from type="number"
  //       stockCount: Number(formValue.stockCount),
  //       minThreshold: Number(formValue.minThreshold),
  //       lastUpdated: new Date(),
  //     };

  //     // Persistence layer call
  //     this.inventoryService.addItem(newItem);
      
  //     // Revert form to initial default values instead of null
  //     this.resetToDefaults();
      
  //     return true;
  //   }
    
  //   // Triggers validation display in UI
  //   this.form.markAllAsTouched(); 
  //   return false;
  // }






// ... inside the class

saveNewItem(): Observable<any> | null {
  if (this.form.valid) {
    const formValue = this.form.getRawValue();

    // REMOVE crypto.randomUUID() - The Backend (MongoDB) creates the ID!
    const newItem = {
      name: formValue.name,
      category: formValue.category,
      stockCount: Number(formValue.stockCount),
      minThreshold: Number(formValue.minThreshold),
    };

    // Return the observable so the component can .subscribe()
    return this.inventoryService.addItem(newItem).pipe(
      tap(() => {
        this.resetToDefaults(); // Reset only on successful save
      })
    );
  }
  
  this.form.markAllAsTouched(); 
  return null; // Return null if the form is invalid
}

  /**
   * Resets the form using the defaultValue keys defined in the JSON schema
   */
  public resetToDefaults() {
    const defaultValues: any = {};
    this.formConfig.forEach(field => {
      defaultValues[field.key] = field.defaultValue ?? '';
    });
    this.form.reset(defaultValues);
  }

  /**
   * Factory function to convert JSON validation rules into Angular Validator functions
   */
  private buildValidators(config: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    
    if (config.required) validators.push(Validators.required);
    if (config.minLength) validators.push(Validators.minLength(config.minLength));
    if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));
    // Check specifically for undefined as '0' is a falsy but valid value
    if (config.min !== undefined) validators.push(Validators.min(config.min));
    
    return validators;
  }


  getErrorMessage(field: any): string {
    const control = this.form.get(field.key);
    if (!control || !control.errors) return '';

    // Get the first error key (e.g., 'required')
    const errorKey = Object.keys(control.errors)[0];
    let message = this.errorLibrary[errorKey] || this.errorLibrary['default'];

    // Professional touch: Replace placeholders like {label} or {min} with real values
    message = message.replace('{label}', field.label);
    
    const errorValue = control.errors[errorKey];
    if (typeof errorValue === 'object') {
       // For errors like minLength, it replaces {minlength} with the actual required length
       const requirementKey = Object.keys(errorValue).find(k => k !== 'actual');
       if (requirementKey) {
         message = message.replace(`{${errorKey}}`, errorValue[requirementKey]);
       }
    } else {
       message = message.replace(`{${errorKey}}`, errorValue);
    }

    return message;
  }
}