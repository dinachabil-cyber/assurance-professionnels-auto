"""
Assurance Pro Auto — Backend Test Suite
Run with: python -m pytest backend/tests/ -v
"""

import pytest
import json


class TestDevisApi:
    """Test the Devis REST API endpoints"""

    def test_create_devis(self, client, db_session):
        """Test successful devis creation"""
        response = client.post("/api/v1/devis", json={
            "nom": "Test",
            "prenom": "User",
            "email": "test@example.com",
            "telephone": "0123456789",
            "activite": "Garagiste",
        })
        assert response.status_code == 201
        data = json.loads(response.data)
        assert data["success"] is True
        assert data["data"]["nom"] == "Test"

    def test_create_devis_missing_required(self, client):
        """Test devis creation with missing required fields"""
        response = client.post("/api/v1/devis", json={
            "activite": "Garagiste",
        })
        assert response.status_code == 422

    def test_create_devis_invalid_phone(self, client):
        """Test devis creation with invalid phone"""
        response = client.post("/api/v1/devis", json={
            "nom": "Test",
            "prenom": "User",
            "telephone": "invalid",
        })
        assert response.status_code == 422

    def test_get_devis_list(self, client, sample_devis):
        """Test getting list of devis"""
        response = client.get("/api/v1/devis")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "data" in data
        assert "meta" in data

    def test_get_single_devis(self, client, sample_devis):
        """Test getting a single devis"""
        response = client.get(f"/api/v1/devis/{sample_devis.id}")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["data"]["id"] == sample_devis.id

    def test_update_devis(self, client, sample_devis):
        """Test updating devis"""
        response = client.put(
            f"/api/v1/devis/{sample_devis.id}",
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["success"] is True

    def test_delete_devis(self, client, sample_devis):
        """Test deleting a devis"""
        response = client.delete(f"/api/v1/devis/{sample_devis.id}")
        assert response.status_code == 200

    def test_get_nonexistent_devis(self, client):
        """Test getting a nonexistent devis returns 404"""
        response = client.get("/api/v1/devis/999999")
        assert response.status_code == 404


class TestSiteApi:
    """Test the Site info API endpoints"""

    def test_site_info(self, client):
        """Test site info endpoint"""
        response = client.get("/api/v1/site/info")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["success"] is True
        assert "nom" in data["data"]
        assert "telephone" in data["data"]
        assert "activites" in data["data"]

    def test_site_recherche(self, client, sample_devis):
        """Test search endpoint"""
        response = client.get(f"/api/v1/site/recherche?q={sample_devis.nom}")
        assert response.status_code == 200


class TestStatistiquesApi:
    """Test the Statistics API endpoints"""

    def test_statistiques(self, client, sample_devis):
        """Test statistics endpoint"""
        response = client.get("/api/v1/statistiques")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["success"] is True
        assert "total_devis" in data["data"]


@pytest.fixture
def sample_devis(db_session):
    """Create a sample devis for testing"""
    from backend.app.models import Devi
    devis = Devi(
        nom="Doe",
        prenom="John",
        email="john@example.com",
        telephone="0612345678",
        activite="Garagiste",
    )
    db_session.add(devis)
    db_session.commit()
    return devis