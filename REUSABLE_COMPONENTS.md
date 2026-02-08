# Composants Réutilisables - Guide d'Utilisation

Ce projet utilise une bibliothèque de composants réutilisables basés sur le principe de l'Atomic Design. Ces composants garantissent la cohérence visuelle et réduisent la duplication de code.

## Composants Atoms Disponibles

### 1. Input
Composant pour les champs de saisie de texte.

```tsx
import { Input } from '@/src/shared/components/atoms';

<Input
  label="Nom"
  type="text"
  value={value}
  onChange={handleChange}
  variant="dark" // 'default' | 'dark' | 'light'
  inputSize="md" // 'sm' | 'md' | 'lg'
  error="Message d'erreur"
  placeholder="Entrez votre nom"
  required
/>
```

**Props:**
- `label?`: Label du champ
- `error?`: Message d'erreur à afficher
- `variant?`: Style visuel ('default' | 'dark' | 'light')
- `inputSize?`: Taille du champ ('sm' | 'md' | 'lg')
- Toutes les props HTML standard d'input

---

### 2. Select
Composant pour les listes déroulantes.

```tsx
import { Select } from '@/src/shared/components/atoms';

<Select
  label="Catégorie"
  value={category}
  onChange={handleChange}
  variant="light"
  error="Sélection requise"
>
  <option value="">Sélectionner...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**Props:**
- `label?`: Label du champ
- `error?`: Message d'erreur
- `variant?`: Style visuel ('default' | 'dark' | 'light')
- `selectSize?`: Taille ('sm' | 'md' | 'lg')
- `options?`: Array d'options `{ value: string; label: string }[]`
- Toutes les props HTML standard de select

---

### 3. TextArea
Composant pour les champs de texte multiligne.

```tsx
import { TextArea } from '@/src/shared/components/atoms';

<TextArea
  label="Description"
  value={description}
  onChange={handleChange}
  rows={4}
  variant="light"
  error="Description trop courte"
  placeholder="Entrez une description..."
/>
```

**Props:**
- `label?`: Label du champ
- `error?`: Message d'erreur
- `variant?`: Style visuel ('default' | 'dark' | 'light')
- `textAreaSize?`: Taille ('sm' | 'md' | 'lg')
- Toutes les props HTML standard de textarea

---

### 4. Checkbox
Composant pour les cases à cocher.

```tsx
import { Checkbox } from '@/src/shared/components/atoms';

<Checkbox
  label="Actif"
  checked={isActive}
  onChange={handleChange}
  variant="light"
/>
```

**Props:**
- `label?`: Label de la checkbox
- `error?`: Message d'erreur
- `variant?`: Style visuel ('default' | 'dark' | 'light')
- Toutes les props HTML standard d'input checkbox (sauf `type`)

---

### 5. Button
Composant pour les boutons.

```tsx
import { Button } from '@/src/shared/components/atoms';

<Button
  onClick={handleClick}
  variant="primary" // 'primary' | 'secondary' | 'danger' | 'ghost'
  isLoading={loading}
  disabled={isDisabled}
  fullWidth
>
  Enregistrer
</Button>
```

**Props:**
- `variant?`: Style du bouton ('primary' | 'secondary' | 'danger' | 'ghost')
- `isLoading?`: Affiche un spinner de chargement
- `fullWidth?`: Bouton pleine largeur
- Toutes les props HTML standard de button

---

### 6. ErrorMessage
Composant pour afficher les messages d'erreur.

```tsx
import { ErrorMessage } from '@/src/shared/components/atoms';

<ErrorMessage message={error} />

// Ou avec children
<ErrorMessage>
  Une erreur est survenue
</ErrorMessage>
```

**Props:**
- `message?`: Message d'erreur à afficher
- `children?`: Contenu personnalisé

---

### 7. PasswordInput
Composant spécialisé pour les mots de passe avec bouton de visibilité.

```tsx
import { PasswordInput } from '@/src/shared/components/atoms';

<PasswordInput
  label="Mot de passe"
  error={errors.password}
  {...register('password')}
/>
```

---

## Composants Molecules

### 1. FormSection
Composant pour organiser et structurer les sections de formulaire.

```tsx
import { FormSection } from '@/src/shared/components/molecules';

<FormSection 
  title="Informations générales"
  description="Détails de base du formulaire"
>
  <Input label="Nom" ... />
  <Input label="Email" ... />
</FormSection>
```

**Props:**
- `title?`: Titre de la section
- `description?`: Description optionnelle de la section
- `children`: Contenu de la section
- `className?`: Classes CSS additionnelles

---

### 2. FormActions
Composant pour les boutons d'action de formulaire.

```tsx
import { FormActions } from '@/src/shared/components/molecules';

<FormActions align="left"> {/* 'left' | 'center' | 'right' | 'between' */}
  <Button type="submit" variant="primary">Enregistrer</Button>
  <Button type="button" variant="secondary">Annuler</Button>
</FormActions>
```

**Props:**
- `children`: Boutons d'action
- `align?`: Alignement ('left' | 'center' | 'right' | 'between')
- `className?`: Classes CSS additionnelles

---

## Autres Composants Atoms

- **Link**: Liens stylisés
- **LoaderCard**: Carte de chargement avec skeleton
- **PriceDisplay**: Affichage formaté des prix
- **Badge**: Badges colorés avec variantes
- **StockIndicator**: Indicateur de stock
- **QuantitySelector**: Sélecteur de quantité
- **Card**: Carte générique avec variantes

---

## Variants de Couleur

### Pour les champs de formulaire (Input, Select, TextArea)
- **`default`**: Fond blanc, texte noir
- **`dark`**: Fond noir/gris foncé, texte blanc (pour interfaces sombres)
- **`light`**: Fond gris clair, texte noir (pour interfaces claires)

### Pour les boutons
- **`primary`**: Rouge principal (actions importantes)
- **`secondary`**: Gris (actions secondaires)
- **`danger`**: Rouge foncé (actions destructrices)
- **`ghost`**: Transparent avec bordure (actions tertiaires)

---

## Tailles

Tous les composants de formulaire supportent 3 tailles:
- **`sm`**: Petit (texte 14px, padding réduit)
- **`md`**: Moyen (par défaut, texte 16px)
- **`lg`**: Grand (texte 18px, padding augmenté)

---

## Exemples d'Utilisation

### Formulaire de Création de Catégorie
```tsx
import { Input, Select, TextArea, Button, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';

<form onSubmit={handleSubmit}>
  <ErrorMessage message={error} />
  
  <FormSection title="Informations générales">
    <Input
      label="Nom *"
      type="text"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      variant="light"
    />
    
    <Select
      label="Catégorie parente"
      value={formData.parent}
      onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
      variant="light"
    >
      <option value="">Aucune</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </Select>
    
    <TextArea
      label="Description"
      rows={4}
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      variant="light"
    />
  </FormSection>
  
  <FormActions align="left">
    <Button type="submit" variant="primary">
      Créer
    </Button>
  </FormActions>
</form>
```

---

## Bonnes Pratiques

1. **Toujours utiliser les composants réutilisables** au lieu des éléments HTML natifs
2. **Choisir le variant approprié** selon le contexte (dark pour fond sombre, light pour fond clair)
3. **Utiliser les labels** pour améliorer l'accessibilité
4. **Afficher les erreurs** via la prop `error` plutôt que des éléments personnalisés
5. **Utiliser ErrorMessage** pour les erreurs globales de formulaire
6. **Préférer Button** avec `variant` plutôt que des classes CSS personnalisées

---

## Migration de Code Existant

### Avant (HTML natif):
```tsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  value={name}
  onChange={handleChange}
/>
```

### Après (Composant réutilisable):
```tsx
<Input
  type="text"
  value={name}
  onChange={handleChange}
  variant="light"
/>
```

---

## Composants Refactorisés

Les composants suivants utilisent maintenant les composants réutilisables:

### E-commerce
- ✅ `AdminCategoryForm` - Formulaire de catégorie
- ✅ `AdminProductForm` - Formulaire de produit
- ✅ `AdminProductList` - Liste et filtres de produits
- ✅ `AdminOrderDetail` - Détail et mise à jour de commande

### Authentification
- ✅ `LoginForm` - Formulaire de connexion
- ✅ `RegisterForm` - Formulaire d'inscription
- ✅ `EditProfileForm` - Formulaire de profil
- ✅ `ResetPasswordRequestForm` - Demande de réinitialisation

---

## Personnalisation

Les composants sont conçus pour être extensibles via:
- La prop `className` pour ajouter des classes Tailwind supplémentaires
- La prop `variant` pour changer le style global
- Les props HTML standard qui sont propagées via `{...props}`

Exemple:
```tsx
<Input
  type="email"
  variant="dark"
  className="mb-4 custom-class"
  autoComplete="email"
/>
```
