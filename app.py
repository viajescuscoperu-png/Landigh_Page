import streamlit as st
from supabase import create_client, Client
import os
from datetime import datetime
import urllib.parse
import uuid

# --- CONFIGURACIÓN DE PÁGINA ---
st.set_page_config(
    page_title="Ofertas Cusco - Viajes Cusco Peru",
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

# --- GENERADOR DE LEAD ID ---
if 'lead_id' not in st.session_state:
    short_uuid = str(uuid.uuid4())[:8].upper()
    st.session_state.lead_id = f"VCP-{short_uuid}"

# --- ESTILOS CSS Y JS PARA TRACKING ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }

    .main {
        background-color: #f8fafc;
    }

    .tour-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 2rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
    }

    .tour-content {
        padding: 1.2rem;
    }

    .tour-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #0f172a;
    }

    .tour-price {
        font-size: 1.2rem;
        color: #0ea5e9;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .inclusion-tag {
        display: inline-block;
        background: #f1f5f9;
        color: #475569;
        font-size: 0.75rem;
        padding: 0.3rem 0.7rem;
        border-radius: 8px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    div.stButton > button {
        background: linear-gradient(90deg, #25D366, #128C7E) !important;
        color: white !important;
        width: 100%;
        border-radius: 14px !important;
        padding: 1rem !important;
        font-weight: 700 !important;
        border: none !important;
        font-size: 1.1rem !important;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3) !important;
    }

    /* Esconder sensores de tracking (Tiempo y Scroll) */
    div[data-testid="stTextInput"] {
        display: none;
    }

    [data-testid="stHeader"] { visibility: hidden; }
    footer { visibility: hidden; }
    
    .stImage > img {
        width: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
    }
</style>

<script>
    // Sistema de Tracking de Comportamiento (Client-Side)
    let startTime = Date.now();
    let maxScroll = 0;

    window.onscroll = function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = Math.round((scrollTop / scrollHeight) * 100);
        if (scrolled > maxScroll) maxScroll = scrolled;
        
        // Enviamos los datos a los inputs ocultos de Streamlit si existen
        const scrollInput = window.parent.document.querySelector('input[aria-label="scroll_val"]');
        const timeInput = window.parent.document.querySelector('input[aria-label="time_val"]');
        
        if(scrollInput) scrollInput.value = maxScroll;
        if(timeInput) timeInput.value = Math.round((Date.now() - startTime) / 1000);
    };
</script>
""", unsafe_allow_html=True)

# --- CAPTURA DE UTMs ---
query_params = st.query_params
utms = {
    "utm_source": query_params.get("utm_source", "direct"),
    "utm_medium": query_params.get("utm_medium", "none"),
    "utm_campaign": query_params.get("utm_campaign", "none"),
    "utm_content": query_params.get("utm_content", "none"),
    "utm_term": query_params.get("utm_term", "none")
}

# --- FUNCIÓN DE REGISTRO INTEGRAL ---
def register_lead(tour_name, time_spent, scroll_depth):
    if supabase:
        try:
            data = {
                "lead_id": st.session_state.lead_id,
                "tour_selected": tour_name,
                "utm_source": utms["utm_source"],
                "utm_medium": utms["utm_medium"],
                "utm_campaign": utms["utm_campaign"],
                "utm_content": utms["utm_content"],
                "utm_term": utms["utm_term"],
                "user_agent": "Meta Browser",
                "status": "nuevo"
            }
            # Intentar agregar métricas de comportamiento si las columnas existen
            try:
                data["time_on_page"] = int(time_spent) if time_spent else 0
                data["scroll_depth"] = int(scroll_depth) if scroll_depth else 0
            except:
                pass
            
            result = supabase.table("leads_raw").insert(data).execute()
            return True
        except Exception as e:
            st.error(f"Error al guardar: {e}")
            return False
    return False

# --- DATOS DE LOS TOURS ---
tours = [
    {"name": "Humantay Lake", "price": "FROM USD 22", "img": "assets/humantay.png", "msg": "Olá! Quero Humantay Lake por USD 22."},
    {"name": "Pallay Punchu", "price": "FROM USD 35", "img": "assets/pallay.png", "msg": "Olá! Quero Pallay Punchu por USD 35."},
    {"name": "Machu Picchu", "price": "SÓ $240 USD", "img": "assets/machu.png", "msg": "Olá! Quero Machu Picchu por $240 USD."},
    {"name": "Rainbow Mountain", "price": "FROM USD 22", "img": "assets/rainbow.png", "msg": "Olá! Quero Rainbow Mountain por USD 22."}
]

# --- UI PRINCIPAL ---
st.markdown('<div style="text-align:center"><h1>Ofertas Exclusivas Cusco</h1></div>', unsafe_allow_html=True)

# --- REGISTRO AUTOMÁTICO DE VISITA (solo una vez por sesión) ---
if 'visit_registered' not in st.session_state:
    st.session_state.visit_registered = False

if not st.session_state.visit_registered and supabase:
    try:
        visit_data = {
            "lead_id": st.session_state.lead_id,
            "tour_selected": "PAGE_VIEW",
            "utm_source": utms["utm_source"],
            "utm_medium": utms["utm_medium"],
            "utm_campaign": utms["utm_campaign"],
            "utm_content": utms["utm_content"],
            "utm_term": utms["utm_term"],
            "user_agent": "Meta Browser",
            "status": "visita"
        }
        supabase.table("leads_raw").insert(visit_data).execute()
        st.session_state.visit_registered = True
    except:
        pass

# Inputs invisibles para capturar datos de JS (Técnica Bridge)
# Nota: Streamlit no tiene inputs ocultos nativos, usamos widgets pequeños controlados por JS
col_hidden1, col_hidden2 = st.columns(2)
with col_hidden1:
    time_val = st.text_input("time_val", value="0", label_visibility="collapsed")
with col_hidden2:
    scroll_val = st.text_input("scroll_val", value="0", label_visibility="collapsed")

# --- GRID ---
phone = "51970909088"

for tour in tours:
    encoded_msg = urllib.parse.quote(tour['msg'])
    wa_link = f"https://wa.me/{phone}?text={encoded_msg}"
    
    with st.container():
        st.image(tour['img'], use_container_width=True)
        st.markdown(f"""
        <div class="tour-card" style="margin-top:-20px">
            <div class="tour-content">
                <div class="tour-title">{tour['name']}</div>
                <div class="tour-price">{tour['price']}</div>
                <a href="{wa_link}" target="_blank" rel="noopener noreferrer"
                   style="display:block; background:linear-gradient(90deg,#25D366,#128C7E);
                          color:white; text-align:center; padding:1rem; border-radius:14px;
                          font-weight:700; text-decoration:none; font-size:1.1rem;
                          margin-top:1rem; box-shadow:0 4px 15px rgba(37,211,102,0.3);">
                    📲 Reservar {tour['name']} Agora
                </a>
            </div>
        </div>
        """, unsafe_allow_html=True)

# --- FOOTER ---
st.markdown('<div style="text-align:center; font-size:0.7rem; color:#94a3b8; margin-top:2rem; padding-bottom:2rem;">Viajes Cusco Peru · Especialistas em Turismo no Peru</div>', unsafe_allow_html=True)
