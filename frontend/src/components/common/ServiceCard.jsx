import React from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Button 
} from '@mui/material';
import { ChevronRight } from 'lucide-react';

/**
 * Composant ServiceCard réutilisable
 * @param {string} image - URL de l'image descriptive
 * @param {string} title - Titre du service
 * @param {string} desc - Description courte
 * @param {React.ElementType} icon - Icône Lucide à afficher
 */
const ServiceCard = ({ image, title, desc, icon: Icon }) => {
  // Fonction de traduction simulée pour la compatibilité du preview
  const t = (key, fallback) => fallback;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: 3, 
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
        transition: 'all 0.3s ease-in-out', 
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
        } 
      }}
    >
      {/* Conteneur Image avec Overlay Icône */}
      <Box sx={{ height: 210, overflow: 'hidden', position: 'relative' }}>
        <Box 
          component="img" 
          src={image} 
          alt={title} 
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s',
            '&:hover': { transform: 'scale(1.1)' }
          }} 
        />
        {/* Badge Icône */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 15, 
            right: 15, 
            bgcolor: '#43a047', // Vert inspec
            color: 'white', 
            p: 1.2, 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          {Icon && <Icon size={22} />}
        </Box>
      </Box>

      {/* Contenu de la carte */}
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#002a54', // Bleu inspec
            fontWeight: 700, 
            mb: 1.5,
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary', 
            mb: 3, 
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {desc}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Button 
            endIcon={<ChevronRight size={16} />} 
            sx={{ 
              p: 0, 
              fontWeight: 700, 
              color: '#43a047', 
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent', color: '#2e7d32' }
            }}
          >
            {t('common.read_more', 'En savoir plus')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;