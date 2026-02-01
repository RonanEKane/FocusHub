// Lemon Squeezy Configuration
// Store: FocusHub

const LEMON_SQUEEZY_CONFIG = {
  apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJkY2FiNTRjODY5ZWJkZGQzNDliMzlhZGNlODZlZjU2NjczYzhmMzZhNGVkY2M2NTBkYzRiMTU4MjU1YTk0ODU4MjhiZGQ3MzRlOGZlNDJmOSIsImlhdCI6MTc2OTk3MTYyMi45MTkwNzQsIm5iZiI6MTc2OTk3MTYyMi45MTkwNzYsImV4cCI6MTc5ODY3NTIwMC4wNzE4NTksInN1YiI6IjY0NDYyMjEiLCJzY29wZXMiOltdfQ.J0-Xw33GbRrZS_Qto6Srm06SOpnRp2XK9QZhB_UgD3BWnkVwBVbojn__hx73K4Oic95Dh3ukYiOZrcwp7OqM5CZZYpc6y4VGegQsc8WFHoagtNFclgupv1mfp0cs5lhF01gY0bNf8gRHjvMwwvuPAd0Ih-c1uJycNnHK9KEUL5h2lzaVNfdz2lm6oAtNlcuKZHH0_xIWmZAg5uRjSM-McfOwO7wrZ2KuPUTQsVLxEkO1NLu74puhvzoZYBoizeXA8giM3hwFeuvb0pbo_BzgZltqi9zEJ-eKAvrJmZWv5pNuAhcNekOOtlqrMdd9icla-1eTtavpGAHOdyVV96NtB5tSd_gLNs6RKFFlrvpOd-R9H6zXBz_ytmnJ12rhbmFpnzW-DHSFF96cEEMl908iauQ8os9-7BewvZb0XqfvR3nzCKRmS-sYw4Ai5iOYmdxlcsczcL-9tcfa4PX9LHxOmwsQE0CtfL9Hb-C28oTSQUY9-EPoPcTh_jou2BZrYaFRz9t9r6pVHBk1Fgr5ED8SZheJJ1jW9RjM2QYwS25C6fQMc9G8OmssPh0YGhx8looCGKK1UEbHmU5bVtLFBtX8vrc-WNPLH3H1YRlOnnwpzMmEc1SqKiQXqnHZTHpBSRAFtbddt9Pe0oar1bavUjZ-Nr8YieMZ6P-gWOm1a_WG-Rw',
  
  // These will be set after you create products in Lemon Squeezy dashboard
  storeId: null, // Get from dashboard
  monthlyVariantId: null, // Monthly subscription variant ID
  yearlyVariantId: null, // Yearly subscription variant ID
  
  // Discount codes (create these in LS dashboard)
  discounts: {
    beta50: 'BETA50', // 50% off forever (first 50 users)
    beta25: 'BETA25'  // 25% off forever (remaining beta users)
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.LEMON_SQUEEZY_CONFIG = LEMON_SQUEEZY_CONFIG;
}
