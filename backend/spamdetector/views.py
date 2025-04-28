# backend/spamdetector/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .ml_model.predict import predict_spam

class NotificationListView(APIView):
    def get(self, request):
        notifications = []
        for doc in settings.MONGO_DB.notifications.find():
            message = doc.get('message', '')
            is_spam, confidence = predict_spam(message)
            notifications.append({
                'id': str(doc['_id']),
                'title': doc.get('title', ''),
                'message': message,
                'is_spam': is_spam,
                'confidence': confidence,
                'created_at': doc.get('created_at').isoformat() if doc.get('created_at') else None
            })
        return Response(notifications)