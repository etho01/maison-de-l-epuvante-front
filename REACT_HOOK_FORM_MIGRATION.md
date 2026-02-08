# Migration vers React Hook Form

## Vue d'ensemble

Tous les formulaires de l'application ont été migrés pour utiliser **React Hook Form** avec **Zod** pour la validation. Cette migration améliore :

- ✅ **Performance** : Moins de re-renders grâce à la gestion optimisée de l'état
- ✅ **Validation** : Schémas Zod centralisés et réutilisables
- ✅ **Type Safety** : Typage TypeScript fort avec inférence de types
- ✅ **UX** : Validation en temps réel et gestion d'erreurs améliorée
- ✅ **Code** : Code plus concis et maintenable

## Fichiers modifiés

### 1. Schémas de validation (Nouveau)

**`src/ecommerce/presentation/schemas/ecommerceSchemas.ts`**
- Schéma `productSchema` pour la création/modification de produits
- Schéma `categorySchema` pour la création/modification de catégories  
- Schéma `addressSchema` pour les adresses de livraison/facturation
- Schéma `checkoutSchema` pour le processus de commande
- Types TypeScript dérivés automatiquement

### 2. Formulaires e-commerce refactorisés

#### `AdminProductForm.tsx`
**Avant :**
```tsx
const [formData, setFormData] = useState({ name: '', price: '', ... });
const handleSubmit = async (e: React.FormEvent) => { ... };
<Input value={formData.name} onChange={(e) => setFormData({...})} />
```

**Après :**
```tsx
const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
  resolver: zodResolver(productSchema)
});
const onSubmit = async (data: ProductFormData) => { ... };
<Input error={errors.name?.message} {...register('name')} />
```

#### `AdminCategoryForm.tsx`
- Migration similaire à AdminProductForm
- Utilisation du schéma `categorySchema`

#### `CheckoutForm.tsx`
- Gestion des adresses imbriquées avec `register('shippingAddress.firstName')`
- Utilisation de `watch('useSameAddress')` pour la réactivité
- Validation robuste des adresses avec schéma Zod

### 3. Formulaires d'authentification (Déjà migrés)

Les formulaires suivants utilisaient déjà React Hook Form :
- ✅ `LoginForm.tsx`
- ✅ `RegisterForm.tsx`
- ✅ `EditProfileForm.tsx`
- ✅ `ChangePasswordForm.tsx`

## Avantages techniques

### Avant (useState)
```tsx
// Gestion manuelle de l'état
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

// Validation manuelle
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.name) setErrors({ name: 'Requis' });
  // ... plus de validation manuelle
};

// Chaque input déclenche un re-render complet
<Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
```

### Après (React Hook Form + Zod)
```tsx
// Schéma centralisé
const schema = z.object({
  name: z.string().min(1, 'Le nom est requis')
});

// Hook unique
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

// Validation automatique
const onSubmit = (data) => { ... };

// Pas de re-render inutile
<Input error={errors.name?.message} {...register('name')} />
```

## Composants atomiques compatibles

Tous les composants atomiques utilisent `forwardRef` pour la compatibilité React Hook Form :
- ✅ `Input` - Champs de texte
- ✅ `Select` - Listes déroulantes
- ✅ `TextArea` - Zones de texte
- ✅ `Checkbox` - Cases à cocher
- ✅ `PasswordInput` - Champs de mot de passe

## Pattern d'utilisation

### Formulaire simple
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mySchema, MyFormData } from './schemas';

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MyFormData>({
  resolver: zodResolver(mySchema),
  defaultValues: { ... }
});

const onSubmit = async (data: MyFormData) => {
  // data est typé et validé
};

<form onSubmit={handleSubmit(onSubmit)}>
  <Input error={errors.field?.message} {...register('field')} />
</form>
```

### Champs imbriqués
```tsx
// Schéma
const schema = z.object({
  address: z.object({
    street: z.string(),
    city: z.string()
  })
});

// Utilisation
<Input {...register('address.street')} />
<Input {...register('address.city')} />
```

### Champs conditionnels avec watch
```tsx
const showBilling = watch('useSameAddress');

{!showBilling && (
  <Input {...register('billingAddress.street')} />
)}
```

## Notes de migration

1. **Conversion de types** : Les valeurs numériques des produits (price, weight) sont converties en string pour la compatibilité avec les inputs HTML
2. **valueAsNumber** : Utiliser `{...register('stock', { valueAsNumber: true })}` pour les champs numériques
3. **Validation** : Tous les schémas Zod incluent des messages d'erreur en français
4. **Disabled state** : Utiliser `isSubmitting` de formState au lieu de gérer manuellement l'état de chargement

## Tests recommandés

- [ ] Création d'un nouveau produit
- [ ] Modification d'un produit existant
- [ ] Création d'une nouvelle catégorie
- [ ] Modification d'une catégorie existante
- [ ] Processus de checkout complet
- [ ] Validation des erreurs (champs vides, formats invalides)
- [ ] Comportement avec des données pré-remplies

## Ressources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Intégration React Hook Form + Zod](https://github.com/react-hook-form/resolvers)
