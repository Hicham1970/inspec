import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Divider
} from '@mui/material';
import { Mail, Phone, MapPin, Clock, Send, Loader2, FileText, Anchor } from 'lucide-react';
import Seo from '../components/common/Seo';

/**
 * Page Contact - Formulaire de contact et demandes de devis
 */
export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'contact',
    service_type: '',
    vessel_name: '',
    port: '',
    planned_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const serviceTypes = [
    { value: 'draft_survey', label: t('contact.service_draft_survey') },
    { value: 'on_offhire', label: t('contact.service_on_offhire') },
    { value: 'under_keel', label: t('contact.service_under_keel') },
    { value: 'cargo', label: t('contact.service_cargo') },
    { value: 'temperature', label: t('contact.service_temperature') },
    { value: 'preport', label: t('contact.service_preport') },
    { value: 'other', label: t('contact.service_other') }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.field_required');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.field_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.field_invalid');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.field_required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('contact.error_generic'));
      }

      setOpenSnackbar(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        subject: '', 
        message: '',
        type: 'contact',
        service_type: '',
        vessel_name: '',
        port: '',
        planned_date: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ submit: error.message || t('contact.error_generic') });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    { icon: MapPin, title: t('contact.info_address'), content: 'Casablanca, Maroc' },
    { icon: Phone, title: t('contact.info_phone'), content: '+212 522 99 23 56' },
    { icon: Mail, title: t('contact.info_email'), content: 'contact@inspectis.ma' },
    { icon: Clock, title: t('contact.info_hours'), content: 'Lun - Ven: 8h00 - 18h00' }
  ];

  return (
    <>
      <Seo
        title={`${t('contact.overline')} - Inspectis`}
        description="Contactez INSPECTIS pour toutes vos demandes d'inspection maritime au Maroc. Notre équipe est disponible pour vous répondre rapidement."
        type="website"
        url="/contact"
      />

      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80") center/cover',
          opacity: 0.15
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 3, fontWeight: 800 }}>
            {t('contact.overline')}
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 800, mt: 1, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            {t('contact.title')}
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 600, opacity: 0.9, fontWeight: 300, lineHeight: 1.8 }}>
            {t('contact.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Contact Content */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#002a54' }}>
                  {t('contact.form_title')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  {t('contact.form_subtitle')}
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Type de demande */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>{t('contact.type_label')}</InputLabel>
                        <Select
                          name="type"
                          value={formData.type}
                          label={t('contact.type_label')}
                          onChange={handleChange}
                        >
                          <MenuItem value="contact">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Mail size={18} />
                              {t('contact.type_contact')}
                            </Box>
                          </MenuItem>
                          <MenuItem value="quotation">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FileText size={18} />
                              {t('contact.type_quotation')}
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.field_name') + ' *'}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.field_email') + ' *'}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.field_phone')}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.field_company')}
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>

                    {/* Champs pour demande de devis */}
                    <Collapse in={formData.type === 'quotation'} style={{ width: '100%' }}>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#43a047' }}>
                            <Anchor size={20} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {t('contact.quotation_details')}
                            </Typography>
                          </Box>
                        </Divider>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>{t('contact.service_type_label')}</InputLabel>
                          <Select
                            name="service_type"
                            value={formData.service_type}
                            label={t('contact.service_type_label')}
                            onChange={handleChange}
                          >
                            {serviceTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('contact.vessel_name_label')}
                          name="vessel_name"
                          value={formData.vessel_name}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('contact.port_label')}
                          name="port"
                          value={formData.port}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('contact.planned_date_label')}
                          name="planned_date"
                          type="date"
                          value={formData.planned_date}
                          onChange={handleChange}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Collapse>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={t('contact.field_subject')}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={t('contact.field_message') + ' *'}
                        name="message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {errors.submit && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                          {errors.submit}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <Loader2 className="animate-spin" /> : <Send />}
                        sx={{ 
                          bgcolor: '#43a047',
                          px: 4,
                          py: 1.5,
                          '&:hover': { bgcolor: '#388e3c' },
                          '&:disabled': { bgcolor: '#ccc' }
                        }}
                      >
                        {loading ? t('contact.button_sending') : t('contact.button_send')}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                {contactInfo.map((info, index) => (
                  <Paper 
                    key={index}
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: '#e8f5e9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <info.icon size={24} sx={{ color: '#43a047' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#002a54' }}>
                        {info.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {info.content}
                      </Typography>
                    </Box>
                  </Paper>
                ))}

                {/* Map placeholder */}
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  textAlign: 'center',
                  py: 6
                }}>
                  <MapPin size={48} sx={{ color: '#43a047', mb: 2 }} />
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {t('contact.map_coming')}
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {formData.type === 'quotation' 
            ? t('contact.success_quotation')
            : t('contact.success_message')
          }
        </Alert>
      </Snackbar>
    </>
  );
}
