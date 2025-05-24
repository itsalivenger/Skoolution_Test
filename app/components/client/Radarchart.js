"use client"; // لو كنت تستخدم Next.js 13/14 مع app router

import { Radar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export default function RadarChart() {
	const data = {
		labels: [
			"Mathématiques",
			"S.V.T",
			"Philosophie",
			"Chimie",
			"English",
			"Physique",
		],
		datasets: [
			{
				// label: "Compétence développée",
				data: [18, 15.75, 19, 14, 18.5, 16.5],
				backgroundColor: "rgba(59, 130, 246, 0.2)",
				borderColor: "rgba(59, 130, 246, 1)",
				pointBackgroundColor: "rgba(59, 130, 246, 1)",
				borderWidth: 2,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			r: {
				pointLabels: {
					color: "#333", // هنا تغيّر اللون
					font: {
						size: 12, // حجم الخط
						weight: "600", // سمك الخط
					},
				},
				ticks: {
					font: {
						size: 10,
					},
					stepSize: 5, // 👈 Each step will be 5 units (5, 10, 15, 20)
					maxTicksLimit: 8, // 👈 Maximum 4 numbers displayed
				},
				angleLines: {
					display: true,
				},
				suggestedMin: 0,
				suggestedMax: 20,
			},
		},
	};

	return <Radar data={data} options={options} />;
}
