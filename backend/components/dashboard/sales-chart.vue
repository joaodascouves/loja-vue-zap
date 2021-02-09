<script>
import { Bar } from 'vue-chartjs';
import { lastDays } from './chart-utils';

export default {
  extends: Bar,
  data() {
    const labels = lastDays(9);

    return {
      data: {
        labels,
        datasets: [
          {
            label: 'Número de vendas',
            backgroundColor: 'orange',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
