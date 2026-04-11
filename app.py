import streamlit as st
from supabase import create_client, Client
import os
from datetime import datetime
import urllib.parse
import uuid

# --- CONFIGURACIÓN DE PÁGINA ---
st.set_page_config(
    page_title="Ofertas VIP Cusco Central",
    page_icon="🏔️",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# --- CONEXIÓN SUPABASE ---
def get_supabase_client():
    try:
        url = st.secrets.get("SUPABASE_URL") or os.getenv("SUPABASE_URL")
        key = st.secrets.get("SUPABASE_KEY") or os.getenv("SUPABASE_KEY")
        if url and key:
            return create_client(url, key)
    except:
        pass
    return None

supabase = get_supabase_client()

# --- CREDENCIALES PARA JS TRACKING ---
try:
    SB_URL = st.secrets.get("SUPABASE_URL") or os.getenv("SUPABASE_URL", "")
    SB_KEY = st.secrets.get("SUPABASE_KEY") or os.getenv("SUPABASE_KEY", "")
except:
    SB_URL = ""
    SB_KEY = ""

# --- GENERADOR DE LEAD ID ---
if 'lead_id' not in st.session_state:
    short_uuid = str(uuid.uuid4())[:8].upper()
    st.session_state.lead_id = f"VCP-{short_uuid}"

# --- CAPTURA DE UTMs ---
query_params = st.query_params
utms = {
    "utm_source": query_params.get("utm_source", "direct"),
    "utm_medium": query_params.get("utm_medium", "none"),
    "utm_campaign": query_params.get("utm_campaign", "none"),
    "utm_content": query_params.get("utm_content", "none"),
    "utm_term": query_params.get("utm_term", "none")
}

# --- ESTILOS CSS Y JS PARA TRACKING ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;600;700&display=swap');

    html, body, [class*="css"], .stApp {
        font-family: 'Inter', sans-serif;
        background-color: #f8fafc;
    }

    /* Hero Section */
    .hero-section {
        text-align: center;
        padding: 3rem 1.5rem 2rem 1.5rem;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        border-radius: 24px;
        margin-bottom: 2.5rem;
        color: white;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
        position: relative;
        overflow: hidden;
    }
    
    .hero-section::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('https://www.transparenttextures.com/patterns/stardust.png');
        opacity: 0.3;
        pointer-events: none;
    }

    .hero-title {
        font-family: 'Poppins', sans-serif;
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(to right, #f8fafc, #cbd5e1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
    }

    .hero-subtitle {
        font-size: 1.15rem;
        color: #94a3b8;
        margin-bottom: 2rem;
        font-weight: 300;
        line-height: 1.5;
    }

    .trust-badges {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        font-size: 0.85rem;
        color: #cbd5e1;
        font-weight: 600;
    }
    
    .trust-badge-item {
        display: flex;
        align-items: center;
        gap: 5px;
        background: rgba(255,255,255,0.1);
        padding: 5px 12px;
        border-radius: 20px;
    }

    /* Cards */
    .tour-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 2.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        border: 1px solid rgba(255,255,255,0.8);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
        position: relative;
    }
    
    .tour-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(8, 145, 178, 0.15); /* Sombra turquesa sutil */
        border-color: #22d3ee; /* Borde intermedio turquesa */
    }

    /* Urgency Badge */
    .urgency-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #ef4444;
        color: white;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
        z-index: 2;
        /* Efecto latido leve */
        animation: pulse-badge 2s infinite;
    }

    @keyframes pulse-badge {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .tour-content {
        padding: 1.8rem;
    }

    .tour-title {
        font-family: 'Poppins', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 0.5rem;
    }

    .tour-price {
        font-size: 1.4rem;
        color: #ea580c; /* Naranja premium */
        font-weight: 800;
    }
    
    .tour-discount {
        text-decoration: line-through;
        color: #94a3b8;
        font-size: 0.95rem;
        margin-right: 8px;
        font-weight: 400;
    }

    /* Botón WhatsApp */
    .wa-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        color: white !important;
        text-align: center;
        padding: 1.2rem;
        border-radius: 50px; /* Redondo "Pastilla" corporativo */
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        font-size: 1.15rem;
        margin-top: 1.5rem;
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        transition: all 0.3s;
        gap: 10px;
    }
    
    .wa-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 12px 25px rgba(37, 211, 102, 0.4);
        background: linear-gradient(135deg, #2ade6f 0%, #17aba3 100%);
    }

    /* Esconder sensores de tracking (Tiempo y Scroll) y Streamlit Elements */
    div[data-testid="stTextInput"], 
    [data-testid="stHeader"], [data-testid="stToolbar"], 
    [data-testid="manage-app-button"], footer, #MainMenu, .stDeployButton {
        display: none !important;
    }
    
    /* Configurar imágenes nativas de Streamlit dentro de las tarjetas */
    .stImage > img {
        width: 100%;
        aspect-ratio: 4 / 3; 
        object-fit: cover;
        border-radius: 20px 20px 0 0;
        transition: transform 0.5s;
    }
    .tour-card:hover .stImage > img {
        transform: scale(1.03); /* Zoom elegante a la imagen */
    }
</style>

<script>
    // Sistema de Tracking Optimizado (Debounce y LocalStorage)
    let startTime = Date.now();
    let maxScroll = 0;
    let scrollTimeout;

    window.onscroll = function() {
        // Debouncer: evitamos sobrecargar el CPU del celular
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = Math.round((scrollTop / scrollHeight) * 100);
            if (scrolled > maxScroll) maxScroll = scrolled;
            
            const scrollInput = window.parent.document.querySelector('input[aria-label="scroll_val"]');
            const timeInput = window.parent.document.querySelector('input[aria-label="time_val"]');
            
            if(scrollInput && timeInput) {
                scrollInput.value = maxScroll;
                timeInput.value = Math.round((Date.now() - startTime) / 1000);
                // Disparar eventos para que Streamlit detecte el cambio a pesar del hidden
                scrollInput.dispatchEvent(new Event('input', { bubbles: true }));
                timeInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }, 1000); // Actualiza máximo cada 1 segundo (Antes era instantáneo causando lag)
    };
</script>
""", unsafe_allow_html=True)

# --- INYECTAR CREDENCIALES Y FUNCIÓN DE WHATSAPP ---
lead_id = st.session_state.lead_id
st.markdown(f"""
<script>
const SB_URL = "{SB_URL}";
const SB_KEY = "{SB_KEY}";
const SERVER_LEAD_ID = "{lead_id}";
const UTM_SOURCE = "{utms['utm_source']}";
const UTM_MEDIUM = "{utms['utm_medium']}";
const UTM_CAMPAIGN = "{utms['utm_campaign']}";
const UTM_CONTENT = "{utms['utm_content']}";
const UTM_TERM = "{utms['utm_term']}";

// 1. Persistencia: Aseguramos que la Sesión no se pierda en LocalStorage
let currentLeadId = localStorage.getItem("vcp_lead_id");
if (!currentLeadId) {{
    currentLeadId = SERVER_LEAD_ID;
    localStorage.setItem("vcp_lead_id", currentLeadId);
}}

window.trackWhatsApp = function(tourName) {{
    // 2. Anti-fuga de Clics: Usar Keepalive
    if (SB_URL && SB_KEY) {{
        const payload = JSON.stringify({{
            lead_id: currentLeadId + '-WA',
            event_type: 'whatsapp_click',
            tour_selected: tourName,
            utm_source: UTM_SOURCE,
            utm_medium: UTM_MEDIUM,
            utm_campaign: UTM_CAMPAIGN,
            utm_content: UTM_CONTENT,
            utm_term: UTM_TERM,
            user_agent: navigator.userAgent,
            status: 'nuevo'
        }});

        // Usamos keepalive: true para que el explorador mande la data a Supabase incluso cerrando la app
        fetch(SB_URL + '/rest/v1/leads_raw', {{
            method: 'POST',
            headers: {{
                'apikey': SB_KEY,
                'Authorization': 'Bearer ' + SB_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            }},
            body: payload,
            keepalive: true
        }}).catch(() => {{}}); // Completamente silencioso
    }}
}}

// 4. Captura de "Engagement" (Segundos y Scroll al abandonar la página)
document.addEventListener("visibilitychange", function() {{
    if (document.visibilityState === 'hidden') {{
        if (SB_URL && SB_KEY) {{
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            const payload = JSON.stringify({{
                lead_id: currentLeadId,
                event_type: 'engagement',
                tour_selected: 'PAGE_LEAVE',
                time_on_page: timeSpent,
                scroll_depth: maxScroll,
                utm_source: UTM_SOURCE,
                utm_medium: UTM_MEDIUM,
                utm_campaign: UTM_CAMPAIGN,
                utm_content: UTM_CONTENT,
                utm_term: UTM_TERM,
                user_agent: navigator.userAgent,
                status: 'visita_fin'
            }});

            // Enviar en silencio absoluto mientras la app se minimiza o cierra
            fetch(SB_URL + '/rest/v1/leads_raw', {{
                method: 'POST',
                headers: {{
                    'apikey': SB_KEY,
                    'Authorization': 'Bearer ' + SB_KEY,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                }},
                body: payload,
                keepalive: true
            }}).catch(() => {{}}); 
        }}
    }}
}});
</script>
""", unsafe_allow_html=True)


# --- UI PRINCIPAL: HERO SECTION ---
st.markdown("""
<div style="text-align:center; padding: 1.5rem 0 1rem 0;">
    <a href="https://viajescuscoperu.com/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
        <h2 style="font-family:'Poppins',sans-serif; color:#0f172a; font-weight:800; margin:0; letter-spacing:-0.5px;">VIAJES <span style="color:#22d3ee;">CUSCO</span> PERÚ</h2>
    </a>
</div>
<div class="hero-section">
    <div class="hero-title">Aventura VIP em Cusco</div>
    <div class="hero-subtitle">Viva a magia dos Andes com atendimento oficial 100% em Português</div>
    <div class="trust-badges">
        <div class="trust-badge-item">✅ Agência Oficial MINCETUR</div>
        <div class="trust-badge-item">🏷️ Membro APTAE</div>
        <div class="trust-badge-item">⭐ Avaliações TripAdvisor</div>
    </div>
</div>
""", unsafe_allow_html=True)

# --- DATOS DE LOS TOURS ---
tours = [
    {"name": "Machu Picchu Express", "old_price": "$300 USD", "price": "SÓ $240 USD", "img": "assets/machu.png", "msg": "Olá! Quero aproveitar a oferta de Machu Picchu Express por $240 USD.", "urgency": "Alta demanda!"},
    {"name": "Humantay Lake VIP", "old_price": "$35", "price": "SÓ $22 USD", "img": "assets/humantay.png", "msg": "Olá! Quero Humantay Lake por USD 22.", "urgency": "Últimas 5 vagas"},
    {"name": "Rainbow Mountain", "old_price": "$35", "price": "SÓ $22 USD", "img": "assets/rainbow.png", "msg": "Olá! Quero Rainbow Mountain por USD 22.", "urgency": "Limitado"},
    {"name": "Pallay Punchu Intenso", "old_price": "$50", "price": "SÓ $35 USD", "img": "assets/pallay.png", "msg": "Olá! Quero Pallay Punchu por USD 35.", "urgency": "Lugar exclusivo"}
]

# --- REGISTRO AUTOMÁTICO DE VISITA ---
if 'visit_registered' not in st.session_state:
    st.session_state.visit_registered = False

if not st.session_state.visit_registered and supabase:
    try:
        visit_data = {
            "lead_id": st.session_state.lead_id, # Esto registrará la sesión para vistas (Page View)
            "tour_selected": "PAGE_VIEW",
            "utm_source": utms["utm_source"],
            "utm_medium": utms["utm_medium"],
            "utm_campaign": utms["utm_campaign"],
            "utm_content": utms["utm_content"],
            "utm_term": utms["utm_term"],
            "user_agent": "Meta Browser - Visita",
            "status": "visita"
        }
        supabase.table("leads_raw").insert(visit_data).execute()
        st.session_state.visit_registered = True
    except:
        pass

# --- INPUTS INVISIBLES (Sensor Bridge) ---
col_hidden1, col_hidden2 = st.columns(2)
with col_hidden1:
    time_val = st.text_input("time_val", value="0", label_visibility="collapsed")
with col_hidden2:
    scroll_val = st.text_input("scroll_val", value="0", label_visibility="collapsed")

# --- GRID DE TOURS ---
phone = "51970909088"

for tour in tours:
    encoded_msg = urllib.parse.quote(tour['msg'])
    wa_link = f"https://wa.me/{phone}?text={encoded_msg}"
    tour_name_js = tour['name'].replace("'", "\\'")
    urgency_html = f'<div class="urgency-badge">🔥 {tour["urgency"]}</div>' if tour.get("urgency") else ""
    
    with st.container():
        # Inject custom HTML div around the image container
        st.markdown(f'<div class="tour-card">{urgency_html}', unsafe_allow_html=True)
        
        try:
            if os.path.exists(tour['img']):
                st.image(tour['img'], use_container_width=True)
            else:
                # Fallback if running somewhere without local assets
                st.image(f"https://via.placeholder.com/600x450/1e293b/FFFFFF?text={urllib.parse.quote(tour['name'])}", use_container_width=True)
        except:
            pass

        st.markdown(f"""
            <div class="tour-content">
                <div class="tour-title">{tour['name']}</div>
                <div><span class="tour-discount">{tour['old_price']}</span><span class="tour-price">{tour['price']}</span></div>
                <a href="{wa_link}" target="_blank" rel="noopener noreferrer" onclick="window.trackWhatsApp('{tour_name_js}');" class="wa-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Reservar Tour Agora
                </a>
            </div>
        </div>
        """, unsafe_allow_html=True)

# --- FOOTER ---
st.markdown("""
<div style="text-align:center; margin-top:3rem; padding: 2rem; border-top: 1px solid #e2e8f0;">
    <div style="font-weight: 700; color: #1e293b; font-size: 1.1rem; margin-bottom: 0.5rem;">Viajes Cusco Peru</div>
    <div style="font-size:0.85rem; color:#64748b; margin-bottom: 1rem;">Especialistas em Turismo VIP no Peru 🇵🇪</div>
    <a href="https://viajescuscoperu.com/" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-bottom:1.5rem; font-size:0.85rem; color:#0891b2; text-decoration:none; font-weight:700; border:1px solid #22d3ee; padding:6px 16px; border-radius:20px; background:rgba(34,211,238,0.1); transition:all 0.3s;">🌐 Visitar Site Oficial</a>
    <div style="font-size:0.75rem; color:#94a3b8;">© 2026 Todos os direitos reservados.</div>
</div>
""", unsafe_allow_html=True)
