<?php

namespace App\Controller;

use App\Entity\NegociantsDevi;
use App\Form\NegociantsDeviType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class NegociantsDevisController extends AbstractController
{
    #[Route('/negociants-auto', name: 'app_negociants')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $negociantsDevi = new NegociantsDevi();
        $form = $this->createForm(NegociantsDeviType::class, $negociantsDevi, [
            'action' => $this->generateUrl('api_negociants_devi_store'),
        ]);

        return $this->render('negociants/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/api/v1/negociants-devis', name: 'api_negociants_devi_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $negociantsDevi = new NegociantsDevi();
        $form = $this->createForm(NegociantsDeviType::class, $negociantsDevi);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($negociantsDevi);
            $entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande de devis négociant a bien été enregistrée.',
                'data' => [
                    'id' => $negociantsDevi->getId(),
                ],
            ], 201);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $errors,
        ], 422);
    }
}