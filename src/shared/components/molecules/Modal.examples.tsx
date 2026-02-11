/**
 * EXEMPLES D'UTILISATION DU COMPOSANT MODAL
 * 
 * Le composant Modal est un composant générique et réutilisable qui peut être utilisé
 * pour créer différents types de modals dans l'application.
 */

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/src/shared/components/molecules';
import { Button, Input } from '@/src/shared/components/atoms';

// =====================================
// EXEMPLE 1 : Modal Simple
// =====================================
function SimpleModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir le modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Titre du modal"
      >
        <p className="text-gray-300">Contenu du modal</p>
      </Modal>
    </>
  );
}

// =====================================
// EXEMPLE 2 : Modal avec sections
// =====================================
function StructuredModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Modal structuré"
      size="lg"
    >
      <ModalHeader>
        <p className="text-gray-400">En-tête personnalisé avec du texte supplémentaire</p>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          <Input label="Nom" placeholder="Entrez votre nom" variant="dark" />
          <Input label="Email" type="email" placeholder="email@example.com" variant="dark" />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => setIsOpen(false)} variant="secondary">
          Annuler
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="primary">
          Sauvegarder
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// =====================================
// EXEMPLE 3 : Modal plein écran
// =====================================
function FullScreenModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Modal plein écran"
      size="full"
    >
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-2xl text-gray-300">Contenu plein écran</p>
      </div>
    </Modal>
  );
}

// =====================================
// EXEMPLE 4 : Modal sans bouton de fermeture
// =====================================
function NoCloseButtonModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Action requise"
      showCloseButton={false}
      closeOnBackdropClick={false}
      closeOnEscape={false}
    >
      <p className="text-gray-300 mb-4">
        Cette action est obligatoire. Vous devez cliquer sur un bouton.
      </p>
      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Accepter</Button>
      </ModalFooter>
    </Modal>
  );
}

// =====================================
// EXEMPLE 5 : Modal de formulaire
// =====================================
function FormModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Ajouter un utilisateur"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="dark"
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              variant="dark"
              required
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" onClick={() => setIsOpen(false)} variant="secondary">
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Créer
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

// =====================================
// EXEMPLE 6 : Modal avec loading
// =====================================
function LoadingModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    // Simuler une action asynchrone
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Action en cours"
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <p className="text-gray-300 mb-4">Voulez-vous confirmer cette action ?</p>
      <ModalFooter>
        <Button onClick={() => setIsOpen(false)} variant="secondary" disabled={isLoading}>
          Annuler
        </Button>
        <Button onClick={handleAction} variant="primary" disabled={isLoading}>
          {isLoading ? 'Traitement...' : 'Confirmer'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// =====================================
// EXEMPLE 7 : ConfirmModal (pré-construit)
// =====================================
import { ConfirmModal } from '@/src/shared/components/molecules';

function ConfirmModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      title="Supprimer l'élément"
      message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
      confirmText="Supprimer"
      cancelText="Annuler"
      variant="danger"
      isLoading={isLoading}
    />
  );
}
