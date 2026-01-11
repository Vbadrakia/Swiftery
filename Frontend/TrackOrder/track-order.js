document.getElementById("track-order-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const trackingId = document.getElementById("trackingId").value.trim();
    const resultSection = document.getElementById("order-details");

    // Show loading state
    resultSection.innerHTML = `
        <div class="order-card">
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 48px; margin-bottom: 15px;">
                    <i class="fas fa-spinner fa-spin" style="color: #27ae60;"></i>
                </div>
                <p style="font-size: 16px; color: #555; font-weight: 600;">Tracking your package...</p>
            </div>
        </div>
    `;

    try {
        const response = await fetch(`${window.API_BASE}/track-order/${trackingId}`);
        const data = await response.json();

        if (response.status === 200) {
            displayOrderDetails(data);
        } else {
            displayError(data.message || "Order not found. Please check your tracking ID.");
        }
    } catch (error) {
        displayError("Unable to connect to server. Please try again later.");
        console.error("Error:", error);
    }
});

function displayOrderDetails(data) {
    const resultSection = document.getElementById("order-details");

    // Parse dates
    const estimatedDelivery = new Date(data.estimatedDelivery);
    const today = new Date();
    const daysLeft = Math.ceil((estimatedDelivery - today) / (1000 * 60 * 60 * 24));

    // Determine status icon and color
    const statusIcons = {
        "In Transit": { icon: "fa-truck", color: "#27ae60" },
        "Delivered": { icon: "fa-check-circle", color: "#27ae60" },
        "Pending": { icon: "fa-hourglass-start", color: "#f39c12" },
        "Out for Delivery": { icon: "fa-location-dot", color: "#3498db" }
    };

    const statusInfo = statusIcons[data.status] || { icon: "fa-box", color: "#27ae60" };

    let html = `
        <div class="order-card">
            <!-- Order Header -->
            <div class="order-header">
                <div class="tracking-id-box">
                    <div class="tracking-id-label">Tracking Number</div>
                    <div class="tracking-id-value">${data.trackingId}</div>
                </div>
                <div class="status-badge" style="background: linear-gradient(135deg, ${statusInfo.color}, ${statusInfo.color}dd);">
                    <i class="fas ${statusInfo.icon}" style="margin-right: 6px;"></i>
                    ${data.status}
                </div>
            </div>

            <!-- Order Information Grid -->
            <div class="order-info-grid">
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-box" style="margin-right: 6px;"></i>Item</div>
                    <div class="info-value">${data.item || "Not specified"}</div>
                </div>
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-map-marker-alt" style="margin-right: 6px;"></i>From</div>
                    <div class="info-value">${data.source}</div>
                </div>
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-flag-checkered" style="margin-right: 6px;"></i>To</div>
                    <div class="info-value">${data.destination}</div>
                </div>
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-calendar" style="margin-right: 6px;"></i>Est. Delivery</div>
                    <div class="info-value">${estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${daysLeft > 0 ? `(in ${daysLeft} days)` : '(Delivered)'}</div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="progress-section">
                <div class="progress-label">Delivery Progress</div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-bar" style="width: 0%;"></div>
                </div>
            </div>

            <!-- Timeline Section -->
            <div class="timeline-section">
                <div class="timeline-title">
                    <i class="fas fa-route"></i>
                    Delivery Timeline
                </div>
                <ul class="checkpoints" id="checkpoints"></ul>
            </div>
        </div>
    `;

    resultSection.innerHTML = html;

    // Populate checkpoints
    const checkpointsList = document.getElementById("checkpoints");
    const progressBar = document.getElementById("progress-bar");

    // Calculate progress
    if (data.checkpoints && data.checkpoints.length > 0) {
        const checkpointIcons = [
            "fa-box",
            "fa-dolly",
            "fa-truck",
            "fa-location-dot",
            "fa-check-circle"
        ];

        const now = new Date().getTime();
        let currentCheckpoint = 0;

        data.checkpoints.forEach((checkpoint, index) => {
            const checkpointTime = new Date(checkpoint.time);
            const li = document.createElement("li");
            li.className = "checkpoint";

            // Determine if this checkpoint is past or current
            const isPast = now >= checkpointTime.getTime();
            const isCurrent = index === data.checkpoints.length - 1 || (now < new Date(data.checkpoints[index + 1]?.time || now).getTime());

            if (isPast && isCurrent) {
                currentCheckpoint = index + 1;
            }

            const icon = checkpointIcons[index] || "fa-box";
            const timeFormatted = checkpointTime.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            li.innerHTML = `
                <div class="checkpoint-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="checkpoint-content">
                    <div class="checkpoint-time">${timeFormatted}</div>
                    <div class="checkpoint-status">${checkpoint.status}</div>
                    <div class="checkpoint-location">
                        <i class="fas fa-location-dot"></i>
                        ${checkpoint.location}
                    </div>
                </div>
            `;

            checkpointsList.appendChild(li);
        });

        // Update progress bar
        const progress = (currentCheckpoint / data.checkpoints.length) * 100;
        setTimeout(() => {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }, 300);
    }
}

function displayError(message) {
    const resultSection = document.getElementById("order-details");
    resultSection.innerHTML = `
        <div class="error-message">
            <span class="error-icon"><i class="fas fa-exclamation-circle"></i></span>
            ${message}
        </div>
    `;
}