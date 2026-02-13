/**
 * Presentation: Validation Schemas
 * Schémas de validation Zod pour les formulaires e-commerce
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création/modification de produit
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z
    .string()
    .min(1, 'La description est requise')
    .min(10, 'La description doit contenir au moins 10 caractères'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Le slug doit être en minuscules avec des tirets'),
  price: z
    .number({ message: 'Le prix doit être un nombre' })
    .positive('Le prix doit être un nombre positif'),
  stock: z
    .number()
    .int('Le stock doit être un nombre entier')
    .min(0, 'Le stock ne peut pas être négatif'),
  type: z.enum(['physical', 'digital', 'subscription'], {
    message: 'Type de produit invalide',
  }),
  sku: z
    .string()
    .min(1, 'Le SKU est requis'),
  categoryId : z
    .number({ message: 'La catégorie est requise' })
    .int('La catégorie doit être un nombre entier')
    .positive('La catégorie doit être un nombre positif'),
  active: z.boolean(),
  exclusiveOnline: z.boolean(),
  weight: z
    .number()
    .positive('Le poids doit être un nombre positif')
    .optional(),
});

/**
 * Schéma de validation pour la création/modification de catégorie
 */
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z
    .string()
    .optional(),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Le slug doit être en minuscules avec des tirets'),
  parentId: z
    .string()
    .optional()
});

/**
 * Schéma de validation pour l'adresse
 */
export const addressSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Le prénom est requis'),
  lastName: z
    .string()
    .min(1, 'Le nom est requis'),
  address: z
    .string()
    .min(1, 'L\'adresse est requise'),
  city: z
    .string()
    .min(1, 'La ville est requise'),
  postalCode: z
    .string()
    .min(1, 'Le code postal est requis')
    .regex(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres'),
  country: z
    .string()
    .min(1, 'Le pays est requis')
    .length(2, 'Le pays doit être un code à 2 lettres'),
});

export const addressSchemaOptional = z.object({
  firstName: z
    .string()
    .optional(),
  lastName: z
    .string()
    .optional(),
  address: z
    .string()
    .optional(),
  city: z
    .string()
    .optional(),
  postalCode: z
    .string()
    .optional(),
  country: z
    .string()
    .optional()
});

/**
 * Schéma de validation pour le checkout
 */
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchemaOptional.optional(),
  customerNotes: z
    .string()
    .optional(),
  useSameAddress: z.boolean(),
}).superRefine((data, ctx) => {
  // Si useSameAddress est false, billingAddress est requis et doit être complet
  if (!data.useSameAddress) {
    if (!data.billingAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'adresse de facturation est requise",
        path: ['billingAddress'],
      });
      return;
    }

    const billingValidation = addressSchema.safeParse(data.billingAddress);
    if (!billingValidation.success) {
      for (const issue of billingValidation.error.issues) {
        ctx.addIssue({
          ...issue,
          path: ['billingAddress', ...issue.path],
        });
      }
    }
  }
});

/**
 * Schéma de validation pour la création/modification de plan d'abonnement
 */
export const subscriptionPlanSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z
    .string()
    .min(1, 'La description est requise')
    .min(10, 'La description doit contenir au moins 10 caractères'),
  price: z
    .number({ message: 'Le prix doit être un nombre' })
    .positive('Le prix doit être un nombre positif'),
  billingInterval: z.enum(['monthly', 'quarterly', 'yearly'], {
    message: 'Intervalle de facturation invalide',
  }),
  durationInMonths: z
    .number()
    .int('La durée doit être un nombre entier')
    .positive('La durée doit être un nombre positif'),
  format: z.enum(['paper', 'digital', 'both'], {
    message: 'Format invalide',
  }),
  active: z.boolean(),
});

/**
 * Types TypeScript dérivés des schémas Zod
 */
export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type SubscriptionPlanFormData = z.infer<typeof subscriptionPlanSchema>;
