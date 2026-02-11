# Composant Modal Réutilisable

## Vue d'ensemble

Le composant `Modal` est un composant générique et hautement configurable pour créer des modals (fenêtres modales) dans l'application. Il gère automatiquement la fermeture avec Escape, le clic en dehors, et empêche le scroll du body.

## Composants disponibles

### 1. Modal (Base)
Le composant principal pour créer des modals personnalisés.

### 2. ConfirmModal
Modal pré-configuré pour les confirmations (suppression, actions importantes).

### 3. Helpers
- `ModalHeader` : En-tête du modal
- `ModalBody` : Corps du modal
- `ModalFooter` : Pied de page avec actions

## API du Modal

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isOpen` | `boolean` | - | **Requis**. Contrôle l'affichage du modal |
| `onClose` | `() => void` | - | **Requis**. Fonction appelée à la fermeture |
| `children` | `ReactNode` | - | **Requis**. Contenu du modal |
| `title` | `string` | - | Titre affiché dans l'en-tête |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Taille du modal |
| `showCloseButton` | `boolean` | `true` | Afficher le bouton de fermeture (×) |
| `closeOnBackdropClick` | `boolean` | `true` | Fermer en cliquant en dehors |
| `closeOnEscape` | `boolean` | `true` | Fermer avec la touche Escape |
| `className` | `string` | `''` | Classes CSS additionnelles |

### Tailles disponibles

- `sm` : 384px (max-w-sm)
- `md` : 448px (max-w-md)
- `lg` : 512px (max-w-lg)
- `xl` : 576px (max-w-xl)
- `full` : Pleine largeur avec marges

## Exemples d'utilisation

### Modal simple

```tsx
import { Modal } from '@/src/shared/components/molecules';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Ouvrir</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Mon Modal"
      >
        <p>Contenu du modal</p>
      </Modal>
    </>
  );
}
```

### Modal avec sections structurées

```tsx
import { Modal, ModalBody, ModalFooter } from '@/src/shared/components/molecules';
import { Button, Input } from '@/src/shared/components/atoms';

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Formulaire"
      size="lg"
    >
      <ModalBody>
        <Input label="Nom" variant="dark" />
        <Input label="Email" type="email" variant="dark" />
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => setIsOpen(false)} variant="secondary">
          Annuler
        </Button>
        <Button variant="primary">
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}
```

### Modal de confirmation (ConfirmModal)

```tsx
import { ConfirmModal } from '@/src/shared/components/molecules';

function DeleteButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // Effectuer la suppression
    await deleteItem();
    setIsLoading(false);
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>Supprimer</button>
      
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Cette action est irréversible. Voulez-vous continuer ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={isLoading}
      />
    </>
  );
}
```

### Modal sans possibilité de fermeture

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => {}}
  title="Action requise"
  showCloseButton={false}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <p>Vous devez compléter cette étape.</p>
  <ModalFooter>
    <Button onClick={handleComplete}>Continuer</Button>
  </ModalFooter>
</Modal>
```

### Modal avec chargement

```tsx
function LoadingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await submitData();
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Envoi en cours"
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <p>Traitement...</p>
      <ModalFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
```

## API du ConfirmModal

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isOpen` | `boolean` | - | **Requis**. Contrôle l'affichage |
| `onClose` | `() => void` | - | **Requis**. Fonction de fermeture |
| `onConfirm` | `() => void` | - | **Requis**. Fonction de confirmation |
| `title` | `string` | - | **Requis**. Titre du modal |
| `message` | `string` | - | **Requis**. Message de confirmation |
| `confirmText` | `string` | `'Confirmer'` | Texte du bouton de confirmation |
| `cancelText` | `string` | `'Annuler'` | Texte du bouton d'annulation |
| `variant` | `'danger' \| 'warning' \| 'info'` | `'danger'` | Style visuel |
| `isLoading` | `boolean` | `false` | État de chargement |

### Variantes

- **`danger`** : Rouge, pour suppressions ou actions critiques
- **`warning`** : Jaune, pour avertissements
- **`info`** : Bleu, pour informations

## Fonctionnalités

✅ **Gestion automatique du scroll** - Bloque le scroll du body quand ouvert  
✅ **Fermeture avec Escape** - Configurable  
✅ **Fermeture au clic extérieur** - Configurable  
✅ **Animations** - Fade-in et zoom-in fluides  
✅ **Backdrop avec blur** - Effet de flou d'arrière-plan  
✅ **Responsive** - S'adapte à toutes les tailles d'écran  
✅ **Accessibility** - Focus trap et ARIA labels  
✅ **TypeScript** - Typé complètement  

## Bonnes pratiques

1. **Toujours gérer l'état `isOpen`** dans le composant parent
2. **Désactiver la fermeture** pendant les opérations async importantes
3. **Utiliser ConfirmModal** pour les confirmations de suppression
4. **Utiliser les helpers** (ModalBody, ModalFooter) pour une structure cohérente
5. **Préférer `size="md"`** pour la plupart des cas d'usage
6. **Ajouter des états de chargement** pour les actions asynchrones

## Style et personnalisation

Le modal utilise le thème dark de l'application :
- Fond : `bg-gray-900`
- Bordure : `border-red-700` (2px)
- Shadow : `shadow-red-900/50`
- Backdrop : Noir avec blur

Vous pouvez personnaliser avec la prop `className` :

```tsx
<Modal
  className="border-blue-700 shadow-blue-900/50"
  // ...
>
```

## Intégration dans l'application

Le modal est déjà utilisé dans :
- ✅ Suppression de produits (AdminProductList)
- ✅ Suppression de catégories (AdminCategoryList)

Pour créer un nouveau modal, importez depuis :

```tsx
import { Modal, ConfirmModal, ModalBody, ModalFooter } from '@/src/shared/components/molecules';
```
