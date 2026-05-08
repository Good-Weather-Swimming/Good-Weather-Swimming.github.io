---
layout: base.html
permalink: /
location:
  name: Good Weather Swimming
  urlPath: /
  whatsappGroup: https://chat.whatsapp.com/MAIN-COMMUNITY
isHome: true
---

<!-- About Section -->
<section id="about" class="section-padding bg-sand">
    <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6 italic text-primary">Salt, Sun, and Community</h2>
        <div class="w-20 h-1 mb-8 mx-auto bg-sky-500"></div>
        
        <div class="space-y-6 text-center max-w-3xl mx-auto">
            <p class="text-xl text-slate-700 leading-relaxed">
                Established in <span class="font-bold text-primary">2025</span>, we are an <span class="font-bold text-pink">Open Group</span> of passionate swimmers in Cyprus. Our mission is simple: to bring together people who love the sea and the Mediterranean lifestyle.
            </p>
            <p class="text-xl text-slate-700 leading-relaxed">
                Whether you're a local resident or just visiting, you're welcome to dive in with us. We use dedicated WhatsApp groups at different levels—community-wide, area-specific, or location-specific—so you can stay connected however you prefer.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div class="p-8 rounded-2xl border-l-8 bg-white shadow-md border-sky-400 text-left">
                <i class="fas fa-unlock text-pink-600 text-2xl mb-4"></i>
                <h4 class="font-bold text-lg mb-2">Totally Free</h4>
                <p class="text-slate-600">No membership fees or hidden costs. We swim for the joy of it.</p>
            </div>
            <div class="p-8 rounded-2xl border-l-8 bg-white shadow-md border-sky-400 text-left">
                <i class="fas fa-cloud-sun text-blue-600 text-2xl mb-4"></i>
                <h4 class="font-bold text-lg mb-2">Weather Based</h4>
                <p class="text-slate-600">We monitor the waves and wind to find the perfect swimming windows.</p>
            </div>
            <div class="p-8 rounded-2xl border-l-8 bg-white shadow-md border-sky-400 text-left">
                <i class="fas fa-users text-orange-600 text-2xl mb-4"></i>
                <h4 class="font-bold text-lg mb-2">Community Focused</h4>
                <p class="text-slate-600">Local swimmers supporting each other in a safe, welcoming environment.</p>
            </div>
        </div>
    </div>
</section>

<!-- Areas Section -->
<section id="areas" class="section-padding bg-white">
    <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-4xl font-bold mb-6 italic text-primary text-center">Our Regions</h2>
        <div class="w-20 h-1 mb-12 mx-auto bg-sky-500"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {%- for area in locations.areas %}
            <div class="bg-gradient-to-br from-blue-50 to-sand rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="h-64 bg-gradient-to-b from-sky-300 to-blue-400 flex items-center justify-center">
                    <div class="text-6xl">🏝️</div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-bold text-primary mb-3">{{ area.name }}</h3>
                    <p class="text-slate-600 mb-2"><i class="fas fa-map-pin text-pink-500 mr-2"></i>{{ area.region }}</p>
                    <p class="text-slate-700 mb-6">{{ area.description }}</p>
                    <a href="{{ area.urlPath }}" class="btn-pink inline-block px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                        Explore Beaches <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
            {%- endfor %}
        </div>
    </div>
</section>

<!-- Join Section -->
<section id="join" class="py-20 bg-primary text-white text-center">
    <div class="max-w-3xl mx-auto px-4">
        <i class="fab fa-whatsapp text-6xl mb-8 text-white"></i>
        <h2 class="text-4xl font-bold mb-6 italic text-white">Join Our Community</h2>
        <p class="text-xl mb-10 opacity-90">Connect with swimmers across all our locations. Join our main WhatsApp group to stay in the loop about opportunities and updates.</p>
        
        <a href="https://chat.whatsapp.com/MAIN-COMMUNITY" target="_blank" class="btn-pink inline-flex items-center justify-center gap-3 font-bold py-4 px-12 rounded-xl text-lg hover:shadow-lg transition-all">
            <i class="fab fa-whatsapp text-2xl"></i> Join Main Community Group
        </a>
        
        <p class="mt-8 text-sm opacity-80">Or explore our regions above to join area-specific and location-specific groups.</p>
    </div>
</section>

